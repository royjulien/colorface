/*
 * Created by: Julien Roy
 * Project: Colorface
 * Last Update: 9.14.13
 */
$(function(){
	//Check if mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		//$('#wrapper').delay(3000).show();
		$('#web').fadeIn(1500);
		setTimeout(function() {
			$('#web').fadeOut(1500);
		}, 2000);
		setTimeout(function() {
			$('#wrapper').show();
		}, 3500);
	} else {
		$('#web').fadeIn(1500).delay(1500).fadeOut(1500);
		$('#web .logo img').animate({ top: '+=50px' }, 1500, 'easeOutExpo');
		$('#wrapper').delay(4500).fadeIn();
	}
	
	//scroll to 0-0
	$('#wrapper').scrollLeft(0);
	
	//tabs
	$('#nav-categories').on('click',function() {
		$(this).css('background-color','#eee');
		$('#nav-colors').css('background-color','white');
		$('.categories').show();
		$('.colors').hide();
	});
	$('#nav-colors').on('click',function() {
		$(this).css('background-color','#eee');
		$('#nav-categories').css('background-color','white');
		$('.categories').hide();
		$('.colors').show();
	});
	
	//category assign colors to dots
	$('i').each(function(index, element) {
		var bgColor = $(this).attr('data-hex');
		$(this).css('background-color',bgColor);
	});
	
	//Sliding/Animating sections
	$('[data-categories], [data-color]').on('click',function() {
		//get data
		var categoryHeader = $(this).attr('data-categories');
		$('#category-header').text(categoryHeader);
		$('[data-category=' + categoryHeader + ']').show();
		
		//transition screens
		$('#categories').animate({ left: '-=100px' }, 687, 'easeOutExpo');
		$('#category, #item').animate({ left: '-=320px' }, 687, 'easeOutExpo');
		//add box shadow to frame
		$('#category').css('box-shadow','0 0 10px -5px black');
		
		//animate dots
		var leftShift = 25;
		for (i=2;i<6;i++) {
			$('.categories-content-colors-li:nth-child('+i+')').delay(333).animate({ left: '+='+leftShift+'px' }, 987, 'easeOutExpo');
			leftShift += 25;
		}
	});
	$('[data-category]').on('click',function() {
		//get data
		var itemHeader = $(this).text(),
			categoryHeader = $('#category-header').text(),
			categoryHex = $(this).find('i').each(function() {
				var hexValue = $(this).attr('data-hex');
				$('#categories-content-ul').append("<li class='categories-content-color' data-hex='"+hexValue+"'><ul class='categories-content-color-details'><li><span class='rgb-value'><span id='r'></span><span id='g'></span><span id='b'></span></span></li><li class='hex-value'></li></ul></li>");
				//Item assign colors
				$('.categories-content-color').attr('data-hex');
				
				$('.categories-content-color').each(function(index, element) {
					var hexValue = $(this).attr('data-hex'),
						rgbValue = hexToRgb(hexValue),
						luma = 0.2126 * rgbValue.r + 0.7152 * rgbValue.g + 0.0722 * rgbValue.b;
					$(this).css('background-color', H=hexValue);
					$(this).find('.hex-value').text(hexValue);
					$(this).find('#r').text('R ' + rgbValue.r);
					$(this).find('#g').text('G ' + rgbValue.g);
					$(this).find('#b').text('B ' + rgbValue.b);
					//Change text color if color palette is to bright =D, thanks wikipedia =D
					if (luma > 200) $(this).css('color','black');
				});
				
			});
		$('#item-header').text(itemHeader);
		$('#item-left-text').text(categoryHeader);
		
		//transition screens
		$('#category').animate({ left: '-=100px' }, 687, 'easeOutExpo');
		$('#item').animate({ left: '-=320px' }, 687, 'easeOutExpo');
		//add box shadow to frame
		$('#item').css('box-shadow','0 0 10px -5px black');
		
		//animating items
		var delay = 300;
		for(i=1;i<9;i++) {
			$('.categories-content-color:nth-child('+i+')').delay(delay).animate({ right: '+=320px' }, 987, 'easeOutExpo');
			delay += 100;
		}
	});
	$('#category .left').on('click',function() {
		//hide all categories-content-details
		$('.categories-content-details').hide();
		//transition screens
		$('#categories').animate({ left: '+=100px' }, 687, 'easeOutExpo');
		$('#category').animate({ left: '+=320px' }, 687, 'easeOutExpo');
		$('#item').animate({ left: '+=320px' }, 687, 'easeOutExpo');
		//add box shadow to frame
		$('#category').delay(687).css('box-shadow','none');
		//animate dots
		var leftShift = 25;
		for (i=2;i<6;i++) {
			$('.categories-content-colors-li:nth-child('+i+')').delay(687).animate({ left: '-='+leftShift+'px' }, 987, 'easeOutExpo');
			leftShift += 25;
		}
	});
	$('#item .left').on('click',function() {
		//remove colors
		$('.categories-content-color').remove();
		//transition screens
		$('#category').animate({ left: '+=100px' }, 687, 'easeOutExpo');
		$('#item').animate({ left: '+=320px' }, 687, 'easeOutExpo');
		//add box shadow to frame
		$('#item').css('box-shadow','none');
		//animating items
		$('.categories-content-color').delay(300).animate({ right: '-=320px' }, 987, 'easeOutExpo');
	});

});

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}