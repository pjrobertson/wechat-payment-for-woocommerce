(function ($) {
    var loopCnt = 500;
    var looptime = 500; //ms

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
                location.href = data.message;
            } else {
                if (loopCnt-- > 0) {

                    setTimeout(queryOrderStatus, looptime);
                }
            }
        }).fail(function () {

        }).always(function () {
        });
    }

    $(function () {
        queryOrderStatus();
    });

})(jQuery);
