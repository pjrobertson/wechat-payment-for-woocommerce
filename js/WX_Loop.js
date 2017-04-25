(function ($) {
    var loopCnt = 1000;
    var looptime = 500; //ms

    var warnOnClose = true;
    function queryOrderStatus() {
        var orderId = $('#WxQRCode').attr('OId');
        $.ajax({
            type: "GET",
            url: wc_checkout_params.ajax_url,
            data: {
                orderId: orderId,
                action: "WXLoopOrderStatus"
            }
        }).done(function (data) {
            data = JSON.parse(data);
            if (data && data.status === "paid") {
                //order paid, jump to confirmation page
                warnOnClose = false;
                location.href = data.message;
            } else {
                if (loopCnt-- > 0) {
                    setTimeout(queryOrderStatus, looptime);
                } else {
			$("#wechatinfo").hide();
			$("#wechatexpired").show();
			warnOnClose = false;
		}
            }
        }).fail(function () {

        }).always(function () {
        });
    }

    $(function () {
        queryOrderStatus();
    });

    $( window ).on('beforeunload', function() {
        if (warnOnClose) {
           return "Closing this window will mean your payment can't be processed. Proceed with caution!";
        }
    });

})(jQuery);
