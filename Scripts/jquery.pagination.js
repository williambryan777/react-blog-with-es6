/** http://www.cnblogs.com/linzheng/archive/2010/11/07/1871069.html
* This jQuery plugin displays pagination links inside the selected elements.
*
* @author Gabriel Birke (birke *at* d-scribe *dot* de)
* @version 1.2
* @param {int} maxentries Number of entries to paginate
* @param {Object} opts Several options (see README for documentation)
* @return {Object} jQuery Object
*/
jQuery.fn.pagination = function(maxentries, opts){
	opts = jQuery.extend({
	    items_per_page: 10, //每页显示的记录数
		num_display_entries:10, //显示的link页码button数
		current_page:0,
		num_edge_entries:0,
		link_to:"javascript:void(0);",
		prev_text:"Prev",
		next_text:"Next",
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
		callback:function(){return false;}
	},opts||{});
	
	return this.each(function() {
		/**
		 * Calculate the maximum number of pages
		 */
		function numPages() {
			return Math.ceil(maxentries/opts.items_per_page);
		}

		/**
        * 极端分页的起始和结束点，这取决于current_page 和 num_display_entries.
		* Calculate start and end point of pagination links depending on 
		* current_page and num_display_entries.
		* @return {Array} 返回 {数组(Array)
		*/
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			return [start,end];
		}

		/**
        * 分页链接事件处理函数
		* This is the event handling function for the pagination links. 
		* @param {int} page_id The new page number
		*/
		function pageSelected(page_id, evt) {
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}

		/**
        * 此函数将分页链接插入到容器元素中
		* This function inserts the pagination links into the container element
		*/
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			// 这个辅助函数返回一个处理函数调用有着正确page_id的pageSelected。
			// This helper function returns a handler function that calls pageSelected with the right page_id
			var getClickHandler = function(page_id) {
				return function(evt){ return pageSelected(page_id,evt); }
			}
            // 辅助函数用来产生一个单链接(如果不是当前页则产生span标签)
			// Helper function for generating a single link (or a span tag if it's the current page)
			var appendItem = function(page_id, appendopts){
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
				appendopts = jQuery.extend({text:page_id+1, classes:""}, appendopts||{});
				if(page_id == current_page){
					var lnk = jQuery("<a class='current'>"+(appendopts.text)+"</a>");
				}
				else
				{
					var lnk = jQuery("<a>"+(appendopts.text)+"</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/,page_id));
						
						
				}
				if(appendopts.classes){lnk.addClass(appendopts.classes);}
				panel.append(lnk);
			}
            // 产生"Previous"-链接
			// Generate "Previous"-Link
			if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
				appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
			}
			// Generate starting points
			if (interval[0] > 0 && opts.num_edge_entries > 0)
			{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
				{
				    jQuery("<a class='wuxian'>" + opts.ellipse_text + "</a>").appendTo(panel);
				}
			}
			// Generate interval links
			for(var i=interval[0]; i<interval[1]; i++) {
				appendItem(i);
			}
			// Generate ending points
			if (interval[1] < np && opts.num_edge_entries > 0)
			{
				if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
				{
				    jQuery("<a class='wuxian'>" + opts.ellipse_text + "</a>").appendTo(panel);
				}
				var begin = Math.max(np-opts.num_edge_entries, interval[1]);
				for(var i=begin; i<np; i++) {
					appendItem(i);
				}
				
			}
			// Generate "Next"-Link
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:"next"});
			}
		}
		
		// Extract current_page from options
		var current_page = opts.current_page;
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		// Store DOM element for easy access from all inner functions
		var panel = jQuery(this);
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){ 
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){ 
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		}
		// When all initialisation is done, draw the links
		drawLinks();
        // call callback function
        //opts.callback(current_page, this);
	});
}

var _IsInitPaging = true;
function createPager(elID, totalRowNum, pageSize, callbackPageChange, initSign) {
    var pageNum = Math.ceil(totalRowNum / pageSize);
    
    if ((_IsInitPaging && typeof (initSign) == "undefined")
        || initSign) {
        if (totalRowNum == 0 || totalRowNum == undefined ||pageNum == 1) {
            $("#" + elID).html('').hide();
        } else {
          $("#" + elID).show().pagination(totalRowNum, {
                callback: callbackPageChange,
                prev_text: '上一页',
                next_text: '下一页',
                items_per_page: pageSize,
                num_display_entries: 5,
                num_edge_entries: 1,
                ellipse_text: "..."
            });  
        }
        
        _IsInitPaging = false;
    }
    changePagerClass(elID);
}

function changePagerClass(elID) {
    var prev = $("#" + elID + " .prev");
    var next = $("#" + elID + " .next");
    if (!prev.next().hasClass('current')) {
        prev.bind('mouseover', function () {
            $(this).addClass('hover');
        });
        prev.bind('mouseout', function () {
            $(this).removeClass('hover');
        });
    } else {
        prev.addClass('disabled');
    }
    if (!next.prev().hasClass('current')) {
        next.bind('mouseover', function () {
            $(this).addClass('hover');
        });
        next.bind('mouseout', function () {
            $(this).removeClass('hover');
        });
    } else {
        next.addClass('disabled');
    }
}
