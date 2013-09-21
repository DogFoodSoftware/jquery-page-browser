$(document).ready(function() {
    // first generate TOC
    var last_group = null;
    $('.blurbSummary:not(#index)').each(function(i, el) {
	var append_selector = '#toc > ul';
	if ($(el).parent('.group').length == 1) {
	    var $parent = $(el).parent('.group');
	    var current_group = $parent.data('title');
	    if (last_group != current_group) {
		$('#toc > ul').append('<li id="toc-' + $parent.attr('id') + '">' + current_group + '<ul></ul></li>');
		last_group = current_group;
	    }
	    if (current_group != null)
		append_selector = '#toc-' + $parent.attr('id') + ' > ul';
	}
	$(append_selector).append('<li><a href="#' + $(el).attr('id') + '">' +
				  $(el).children('.blurbTitle').html() +
				  '</a></li>');
    });
    
    var hash = window.location.hash;
    if (hash == null || hash == '' ||
	// don't fade everyone out due to bad '#'
	($('.blurbSummary:not(' + hash + ')').length == 
	 $('.blurbSummary').length))
	hash = '#index';
    $('.blurbSummary' + hash).slideDown('fast');
    $('a[href]').bind('click', function(event) {
	var target = $(event.target).attr('href');
	if (target.match('^#')) {
	    var post_show = null;
	    if (target.match('^#toc-')) {
		post_show = (function(scroll_target) {
		    return function() {
			$('#toc > ul > li:not(' + scroll_target + ')').
			    css('opacity', 0.0);
			$(scroll_target).css('opacity', 1.0);
			$('html, body').animate({
			    scrollTop: $(scroll_target).offset().top
			}, 'fast');
			$('#toc > ul > li:not(' + scroll_target + ')').
			    filter(':parent:not(' + scroll_target + ')').
			    fadeTo(2000, 1.0);
		    };
		})(target);
		target = '#index';
	    }
	    if ($(target).length > 0) {
	    	$('.blurbSummary:not(' + target + ')').slideUp('fast');
	    	$('.blurbSummary' + target ).slideDown('fast', post_show);
	    }
	    else alert("Sorry, bad link.");
	}
    });
    
    var bad_links = [];
    $('a[href]').each(function(i, el) {
	var target = $(el).attr('href');
	if (target.match('^#') && $(target).length == 0)
	    bad_links.push(target);
    });
    if (bad_links.length > 0)
	alert('Bad links: ' + bad_links.join(', ') + '.');
});
