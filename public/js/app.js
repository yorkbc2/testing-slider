$(function () {

	var $slider = $("#wrap-slider");

	$slider.slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		responsive: [

			{
				breakpoint: 720,
				settings: {
					slidesToShow: 2,
					centerPadding: "40px",
					arrows: false
				}
			},

			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: "40px",

					arrows: false
				}
			}

		]
	});

	$slider.on("beforeChange", function (event, slick) {
		setTimeout(function () {
			Actions.CheckSlider()
		}, 200)
	})

	var $buttons = $("button.wrap-slider--button");


	var Actions = {
		Next: function (e) {
			$slider.slick("slickNext")
			Actions.CheckSlider()
		},

		Prev: function (e) {
			$slider.slick("slickPrev")
			Actions.CheckSlider()
		},

		GetButton: function (methodName) {
			var Button = $buttons.filter(function (index, item) {
				return item.getAttribute("data-method") == methodName
			})

			return Button;
		},

		CheckSlider: function() {
			var $slides = $slider.find(".slick-slide");

			if($slides.eq(0).hasClass("slick-active")) {
				var Button = Actions.GetButton("next")

				$buttons.hide()
				Button.show()
			}
			else if ($slides.eq($slides.length - 1).hasClass("slick-active")) {
				var Button = Actions.GetButton("prev")

				$buttons.hide()
				Button.show()
			}
		}
	}

	Actions.CheckSlider()

	$buttons.each(function (item) {

		var attribute = $(this).attr("data-method");

		switch(attribute) {
			case "next" :
				$(this).click(Actions.Next)
				break;
			case "prev" :
				$(this).click(Actions.Prev)
				break;
			default :
				return null;
		}

	})

})