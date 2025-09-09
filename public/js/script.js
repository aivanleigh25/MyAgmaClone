// Resize
$(window).on('resize', function () {
   // windowResize();
})

$(window).on('load', function () {
   // windowResize();
})

$(window).on("orientationchange", function () {
    //windowResize();
})

let zoomScale = 1;
function windowResize() {
    pageWidth = $(window).width();
    uiWidth = $('.wrapper').width();
    pageHeight = $(window).height();
    uiHeight = $('.wrapper').height();
    if (pageWidth < uiWidth || pageHeight < uiHeight) {
        scaleX = pageWidth / uiWidth;
        scaleY = pageHeight / uiHeight;
        if (scaleX > scaleY) {
            scale = scaleY;
            zoomScale = scale;
        }
        else {
            scale = scaleX;
            zoomScale = scale;
        }
        /*
        $("#inventory").css({
            transform: `translate(-50%, 0) scale(${scale})`,
            bottom: parseInt($("#inventory").css('top')) - $("#inventory").offset().top + 10,
        })
        $("#inventory").css({
            transform: `translate(-50%, 0) scale(${scale})`,
            bottom: parseInt($("#inventory").css('top')) - $("#inventory").offset().top + 10,
        })
        $(".chat").css({
            transform: `scale(${scale})`,
            left: parseInt($(".chat").css('left')) - $(".chat").offset().left + 10,
            bottom: parseInt($(".chat").css('top')) - $(".chat").offset().top + 10,
        })
        $(".chat").css({
            transform: `scale(${scale})`,
            left: parseInt($(".chat").css('left')) - $(".chat").offset().left + 10,
            bottom: parseInt($(".chat").css('top')) - $(".chat").offset().top + 10,
        })
        $(".bots").css({
            transform: `translate(-50%, 0) scale(${scale})`,
            top: parseInt($(".bots").css('top')) - $(".bots").offset().top + 10,
        })
        $(".bots").css({
            transform: `translate(-50%, 0) scale(${scale})`,
            top: parseInt($(".bots").css('top')) - $(".bots").offset().top + 10,
        })
        */
        $('.wrapper, .modal.show, .alert.show').attr('style', 'transform: translate(-50%, -50%) scale(' + scale + ');');
    }
    else {
        zoomScale = 1;
        //$('.wrapper, .modal.show, .alert.show').attr('style', 'transform:  translate(-50%, -50%) scale(1);');
       // $(".chat, .inventory, .bots").removeAttr('style');
    }
}

// Hide 'n Show
$("[hide]").click(function () {
    let toHide = $(this).attr("hide");

    $(toHide).hide();
})

$("[show]").click(function () {
    let toShow = $(this).attr("show");

    $(toShow).show();
})

$("[click]").click(function () {
    let toClick = $(this).attr("click");

    $(toClick).click();
})

// Serverlist
$(".servermode .header").click(function () {
    let serverlist = $(this).closest('.serverlist').attr('serverlist');
    let parent = $(this).parents('.servermode');
    let toggled = parent.hasClass('toggled');
    let body = parent.find('.body');

    if ($(`[serverlist=${serverlist}] .servermode.toggled`).length > 0 && !toggled) {
        $(`[serverlist=${serverlist}] .servermode.toggled .body`).css({
            height: "0px"
        });

        $(`[serverlist=${serverlist}] .servermode.toggled`).removeClass("toggled")
    }

    let length = body.children('.servers').children().length;
    let multiplier = Math.ceil(length / 4) - 1;
    let height = 85 + (75 * multiplier);

    if (toggled) {
        parent.removeClass("toggled")
        body.css({
            height: "0px"
        })
    } else {
        parent.addClass("toggled")
        body.css({
            height: `${height}px`
        })
    }
})

$(".servermode .body button").click(function () {
    if ($(this).hasClass("active")) return;
    $(".servermode .body button.active").removeClass("active");
    $(".servermode .header.active").removeClass("active");

    $(this).addClass("active");
    $(this).parents(".body").prev(".header").addClass("active");
})

/**
 * Modals
 */

let prevModal = "";

function modal(target, action) {
    if ($(".modal.show").length > 0 && action === 'show') {
        prevModal = $(".modal.show");
        prevModal.removeClass("show").addClass("hide").css({
            transform: "translate(-50%, -50%) scale(0)"
        });

        setTimeout(() => {
            target.removeClass("hide").addClass("show").css({
                transform: "translate(-50%, -50%) scale(" + zoomScale + ")"
            });
        }, 100);
    } else {
        switch (action) {
            case "show":
                $(".modals").show();
                $(".modals .overlay").fadeIn(200)
                target.removeClass("hide").addClass("show").css({
                    transform: "translate(-50%, -50%) scale(" + zoomScale + ")"
                });
                break;
            case "hide":
                if (prevModal.length) {
                    $(".modal.show").removeClass("show").addClass("hide").css({
                        transform: "translate(-50%, -50%) scale(0)"
                    });

                    setTimeout(() => {
                        prevModal.removeClass("hide").addClass("show").css({
                            transform: "translate(-50%, -50%) scale(" + zoomScale + ")"
                        });
                        prevModal = "";
                    }, 100);
                } else {
                    $(".modals .overlay").fadeOut(200)
                    target.removeClass("show").addClass("hide").css({
                        transform: "translate(-50%, -50%) scale(0)"
                    });

                    setTimeout(() => {
                        $(".modals").hide();
                    }, 200);
                }
                break;
        }
    }
}

$("[modal-btn]").click(function () {
    let target = $(this).attr("target");
    let action = $(this).attr("action");

    windowResize()
    modal($(target), action)
})

/**
 * Warn before buy clicked
 */
$("[warn-before-buy]").click(function () {
    let parsed = JSON.parse($(this).attr("warn-before-buy"));

    warnBeforeBuy(parsed.type, parsed.currency, parsed.price, parsed.name,parsed.prodId)
})

$("[warn-before-craft]").click(function () {
    let parsed = JSON.parse($(this).attr("warn-before-craft"));

    warnBeforeCraft(parsed.name, parsed.price)
})

$("[item-info]").click(function () {
    let parsed = JSON.parse($(this).attr("item-info"));

    itemInfoAlert(parsed.title, parsed.text)
})

/**
 * Item info
 */

function itemInfoAlert(title, text) {
    this.title = title;
    this.text = text;
    this.elements = {
        title: $("[alert-title]"),
        body: $("[alert-body]"),
        buttons: $("[alert-buttons]")
    }

    // Show function
    this.show = function () {
        $(".alerts").show();
        $(".alerts .overlay").fadeIn(200)
        $(".alerts .alert").removeClass("hide").addClass("show").css({
            transform: "translate(-50%, -50%) scale(" + zoomScale + ")"
        });
    }

    // Hide function
    this.hide = function () {
        $(".alerts .overlay").fadeOut(200)
        $(".alerts .alert").removeClass("show").addClass("hide").css({
            transform: "translate(-50%, -50%) scale(0)"
        });

        $("[alert-cancel], [alert-confirm]").off("click");

        setTimeout(() => {
            $(".alerts").hide();
            let { title, body, buttons } = this.elements;
            title.empty();
            body.empty();
            buttons.empty();
        }, 200);
    }

    this.prepare = function () {
        let { title, body, buttons } = this.elements;

        title.text(this.title);

        body.html(`<p>${this.text}</p>`)

        buttons.html(`<button class="btn primary small" alert-cancel>Ok!</button>`)

        $("[alert-cancel], .alerts .overlay").click(function () {
            hide();
        })

        this.show();
    }

    this.prepare()
}

/**
 * Warn before someone crafts a thing
 */
function warnBeforeCraft(name, price) {
    this.name = name;
    this.level = price.level;
    this.runes = price.runes;
    this.time = price.time;
    this.energy = price.energy;
    this.elements = {
        title: $("[alert-title]"),
        body: $("[alert-body]"),
        buttons: $("[alert-buttons]")
    }

    // Show function
    this.show = function () {
        $(".alerts").show();
        $(".alerts .overlay").fadeIn(200)
        $(".alerts .alert").removeClass("hide").addClass("show").css({
            transform: "translate(-50%, -50%) scale(" + zoomScale + ")"
        });
    }

    // Hide function
    this.hide = function () {
        $(".alerts .overlay").fadeOut(200)
        $(".alerts .alert").removeClass("show").addClass("hide").css({
            transform: "translate(-50%, -50%) scale(0)"
        });

        $("[alert-cancel], [alert-confirm]").off("click");

        setTimeout(() => {
            $(".alerts").hide();
            let { title, body, buttons } = this.elements;
            title.empty();
            body.empty();
            buttons.empty();
        }, 200);
    }


    // Prepare everything...
    this.prepare = function () {
        let { title, body, buttons } = this.elements;

        let timeVal = moment.duration({ "seconds": 1 * time })
        let years = timeVal.years() === 1 ? timeVal.years() + ' year ' : '' || timeVal.years() > 1 ? timeVal.years() + ' years ' : '';
        let days = timeVal.days() === 1 ? timeVal.days() + ' day ' : '' || timeVal.days() > 1 ? timeVal.days() + ' days ' : '';
        let hours = timeVal.hours() === 1 ? timeVal.hours() + ' hour ' : '' || timeVal.hours() > 1 ? timeVal.hours() + ' hours ' : '';
        let minutes = timeVal.minutes() > 0 ? timeVal.minutes() + ' minutes' : '';

        title.text("Craft Confirmation");
        let message = `<p>How many <b>${this.name}</b> would you like to craft?</p>
        <input craft-amount type="number" min="1" value="1"/>
        <p>This will cost you</p><div class="runesamount"><span air-amount><b>${this.runes.air}</b> Air</span><span nature-amount><b>${this.runes.nature}</b> Nature</span><span cosmic-amount><b>${this.runes.cosmic}</b> Cosmic</span><span energy-amount><b>${this.energy}</b> Energy</span></div>
        <p>Time to Craft: <b time-craft>${years + days + hours + minutes}</b></p>
        <p>Completed at: <b completed-craft>${moment().add(1 * time, 'seconds').format('MMMM Do YYYY, hh:mm A')}</b></p>
        `;
        body.html(message);

        buttons.html(`<button class="btn small success" alert-confirm>Confirm</button>
        <button class="btn small danger" alert-cancel>Cancel</button>`)

        var completedInterval = setInterval(function () {
            $("[completed-craft]").text(moment().add($("[craft-amount]").val() * time, 'seconds').format('MMMM Do YYYY, hh:mm A'));
        }, 1000);

        $("[craft-amount]").on("input", function () {
            timeVal = moment.duration({ "seconds": $(this).val() * time });
            years = timeVal.years() === 1 ? timeVal.years() + ' year ' : '' || timeVal.years() > 1 ? timeVal.years() + ' years ' : '';
            days = timeVal.days() === 1 ? timeVal.days() + ' day ' : '' || timeVal.days() > 1 ? timeVal.days() + ' days ' : '';
            hours = timeVal.hours() === 1 ? timeVal.hours() + ' hour ' : '' || timeVal.hours() > 1 ? timeVal.hours() + ' hours ' : '';
            minutes = timeVal.minutes() > 0 ? timeVal.minutes() + ' minutes' : '';

            $("[time-craft]").text(years + days + hours + minutes);
            $("[completed-craft]").text(moment().add($(this).val() * time, 'seconds').format('MMMM Do YYYY, hh:mm A'));

            let newRunes = {
                air: runes.air * $(this).val(),
                nature: runes.nature * $(this).val(),
                cosmic: runes.cosmic * $(this).val()
            }

            $("[air-amount]").html(`<b>${newRunes.air}</b> Air`)
            $("[nature-amount]").html(`<b>${newRunes.nature}</b> Nature`)
            $("[cosmic-amount]").html(`<b>${newRunes.cosmic}</b> Cosmic`)
            $("[energy-amount]").html(`<b>${energy * $(this).val()}</b> Energy`)
        })

        $("[alert-confirm]").click(function () {
            clearInterval(completedInterval)
        })

        // Set event on cancel click
        $("[alert-cancel], .alerts .overlay").click(function () {
            hide();
            clearInterval(completedInterval)
        })

        this.show()
    }

    this.prepare()
}

/**
 * Warn before someone buys a skin/wearable/potion/minions/runes
 */
function warnBeforeBuy(type, currency, price, name, prodId) {
    this.type = type;
    this.currency = currency;
    this.price = price;
    this.name = name;
    this.prodId = 0;
    if(prodId) {
        this.prodId = prodId;
    }
    this.elements = {
        title: $("[alert-title]"),
        body: $("[alert-body]"),
        buttons: $("[alert-buttons]")
    }

    // Show function
    this.show = function () {
        $(".alerts").show();
        $(".alerts .overlay").fadeIn(200)
        $(".alerts .alert").removeClass("hide").addClass("show").css({
            transform: "translate(-50%, -50%) scale(" + zoomScale + ")"
        });
    }

    // Hide function
    this.hide = function () {
        $(".alerts .overlay").fadeOut(200)
        $(".alerts .alert").removeClass("show").addClass("hide").css({
            transform: "translate(-50%, -50%) scale(0)"
        });

        $("[alert-cancel], [alert-confirm]").off("click");

        setTimeout(() => {
            $(".alerts").hide();
            let { title, body, buttons } = this.elements;
            title.empty();
            body.empty();
            buttons.empty();
        }, 200);
    }

    // Set Data
    this.prepare = function () {
        let { title, body, buttons } = this.elements;


        if (this.currency === "levels") {
            title.text("Claim Confirmation");
            body.html(`<p>Are you sure that you want to claim the <b>${this.name}</b> ${this.type}?</p>`);
        }
        if (this.currency === "coins" && this.type !== "minions" && this.type !== "runes") {
            title.text("Purchase Confirmation");
            body.html(`<p>Are you sure that you want to buy the <b>${this.name}</b> ${this.type}?</p>
            <p>This will cost you <b><i class="fas fa-coins"></i> ${this.price}</b></p>`);
        }
        if (this.currency === "coins" && this.type === "minions") {
            title.text("Purchase Confirmation");
            body.html(`<p>Are you sure that you want to buy <b>${this.name}</b>?</p>
            <p>This will cost you <b><i class="fas fa-coins"></i> ${this.price}</b></p>`);
        }
        if (this.currency === "coins" && this.type === "runes") {
            title.text("Purchase Confirmation");
            body.html(`<p>Are you sure that you want to buy <b>${this.name}</b>?</p>
            <p>This will cost you <b><i class="fas fa-coins"></i> ${this.price}</b></p>`);
        }

        buttons.html(`<button class="btn small success" alert-confirm>Confirm</button>
        <button class="btn small danger" alert-cancel>Cancel</button>`)


        // Diff request every type?
        switch (this.type) {
            case "skin":
                if (this.currency === "coins") {
                    // if skin is bought using coins???
                    $("[alert-confirm]").click(function () {
                        // Code here runs if its a skin they want to buy
                    })
                } else if (this.currency === "levels") {
                    // if skin is bought using levels???
                    $("[alert-confirm]").click(function () {
                        // Code here runs if its a skin they want to buy
                    })
                }
                break;
            case "wearable":
                if (this.currency === "coins") {
                    // if wearable is bought using coins???
                    $("[alert-confirm]").click(function () {
                        // Code here runs if its a wearable they want to buy
                    })
                }
                break;
            case "items":
            console.log('try buy items');
                if (this.currency === "coins") {
                    let prodId = this.prodId;
                    // if wearable is bought using coins???
                    var multiOption = false;
                    $("[alert-confirm]").click(function () {
                        purchaseItem(prodId, multiOption ? $("#shopAmountDropdown").val() : 1);
                        hide();
                        // Code here runs if its a wearable they want to buy
                    })
                }
                break;
            
            case "minions":
                console.log('buy minions?');
                let prodId = this.prodId;
                 $("[alert-confirm]").click(function () {
                    console.log('buy minions clicked yes');
                    console.log('prodId: ' + prodId);
                    purchaseMinion(prodId);
                    hide();
                 });
                break;
            case "potion":
                if (this.currency === "coins") {
                    // if potion is bought using coins???
                    $("[alert-confirm]").click(function () {
                        // Code here runs if its a potion they want to buy
                    })
                }
                break;
        }

        // Set event on cancel click
        $("[alert-cancel], .alerts .overlay").click(function () {
            hide();
        })

        // Show the alert
        this.show();
    }

    // Run prepare function
    this.prepare()
}

/**
 * Minions
 */

$("[toggle-minions]").click(function () {
    $(".bots button:first-child").toggle()
})


/**
 * Regions
 */

$("[region]").click(function () {
    if ($(this).hasClass("active")) return;

    $("[region].active").removeClass("active");
    $(this).addClass("active");

    $("[serverlist]").hide();
    $(`[serverlist=${$(this).attr("region")}]`).show();
})

/**
 * Shop Nav
 */

$("[shop-nav]").click(function () {
    if ($(this).hasClass("active")) return;

    let shop = $(this).attr("shop-nav");
    $("[shop-nav].active").removeClass("active");
    $(this).addClass("active");
    $("[shop]").hide();
    $(`[shop=${shop}]`).show();
})

$("[inner-shop-nav]").click(function () {
    if ($(this).hasClass("active")) return;
    $(this).parents('.inner-nav').children('.active').removeClass("active");
    let shop = $(this).attr('inner-shop-nav');
    $(this).parent().parents('.shop-page').children('.inner-shop').hide();
    $(this).parents('.shop-page').find(`[inner-shop=${shop}]`).show();
    $(this).addClass("active")

})

$("[inner-shop-nav-skins]").click(function () {
    if ($(this).hasClass("active")) return;
    $(this).parents('.inner-nav').children('.active').removeClass("active");
    let shop = $(this).attr('inner-shop-nav-skins');
    $('#skinBrowser').children('.inner-shop').hide();
    $('#skinBrowser').find(`[inner-shop=${shop}]`).show();
    //$(this).parent().parents('.shop-page').children('.inner-shop').hide();
   // $(this).parents('.shop-page').find(`[inner-shop=${shop}]`).show();
    $(this).addClass("active")

})

$("[friends-nav]").click(function () {
    if ($(this).hasClass("active")) return;

    let friends = $(this).attr("friends-nav");
    $("[friends-nav].active").removeClass("active");
    $(this).addClass("active");
    $("[friends]").hide();
    $(`[friends=${friends}]`).show();
})

$("[settings-nav]").click(function () {
    if ($(this).hasClass("active")) return;

    let settings = $(this).attr("settings-nav");
    $("[settings-nav].active").removeClass("active");
    $(this).addClass("active");
    $("[settings]").hide();
    $(`[settings=${settings}]`).show();
})