var AG = {
    sendHref: function() {
    	if(window.sendNickName) {
    		//get the window protocol href
    	}
    },
    captchaRenderId: false,
    showCaptcha: function() {
        if(window.AG.captchaRenderId) {
            grecaptcha.reset();
        } else {
            window.AG.captchaRenderId  = true;
            grecaptcha.render(jQuery('#captchaIn')[0], {
              'sitekey' : '6LcR_xQUAAAAAHKSidDgZQmUeNdXZ091xL_pi0n_',
              'callback' : function(captchaCode) {
                    if(window.AG && window.AG.showCaptcha) {
                        window.sendCaptchaInput(captchaCode);
                    }
                    setTimeout(function() {
                        jQuery('#captchaOut').hide();
                    }, 300);
              },
              'theme' : 'dark'
            });
        }
        jQuery('#captchaOut').show();
    },
        showCaptchaReg: function() {
        if(window.AG.captchaRenderId) {
            grecaptcha.reset();
        } else {
            window.AG.captchaRenderId  = true;
            grecaptcha.render(jQuery('#captchaInReg')[0], {
              'sitekey' : '6LcR_xQUAAAAAHKSidDgZQmUeNdXZ091xL_pi0n_',
              'callback' : function(captchaCode) {
                    if(window.AG && window.AG.showCaptcha) {
                        window.sendCaptchaInput(captchaCode);
                    }
                  /*  setTimeout(function() {
                        jQuery('#captchaOutReg').hide();
                    }, 300);
                    */
              },
              'theme' : 'dark'
            });
        }
        jQuery('#captchaOutReg').show();
    },
};
