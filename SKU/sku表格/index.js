$(function () {
	$('.div_contentlist label').bind('change', function () {
		step.Creat_Table();
	});
	var step = {
		Creat_Table: function () {
			step.hebingFunction();
			var SKUObj = $('.Father_Title');
			//var skuCount = SKUObj.length;//
			var arrayTile = new Array();
			var arrayInfor = new Array();
			var arrayColumn = new Array();
			var bCheck = true;
			var columnIndex = 0;
			$.each(SKUObj, function (i, item) {
				arrayColumn.push(columnIndex);
				columnIndex++;
                arrayTile.push(SKUObj.find('li').eq(i).html());
                console.log('%c 🍵 SKUObj: ', 'font-size:20px;background-color: #ED9EC7;color:#fff;', SKUObj);
                console.log('%c 🍅 arrayTile: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', arrayTile);
				var itemName = 'Father_Item' + i;
				//閫変腑鐨凜HeckBox鍙栧€�
				var order = new Array();
				$('.' + itemName + ' input[type=checkbox]:checked').each(function () {
					order.push($(this).val());
				});
				arrayInfor.push(order);
				if (order.join() == '') {
					bCheck = false;
				}
				//var skuValue = SKUObj.find("li").eq(index).html();
			});

			if (bCheck == true) {
				var RowsCount = 0;
				$('#createTable').html('');
				var table = $('<table id="process" border="1" cellpadding="1" cellspacing="0" style="width:100%;padding:5px;"></table>');
				table.appendTo($('#createTable'));
				var thead = $('<thead></thead>');
				thead.appendTo(table);
				var trHead = $('<tr></tr>');
				trHead.appendTo(thead);

				$.each(arrayTile, function (index, item) {
					var td = $('<th>' + item + '</th>');
					td.appendTo(trHead);
				});
				var itemColumHead = $('<th  style="width:70px;">价格</th><th style="width:70px;">库存</th> ');
				itemColumHead.appendTo(trHead);

				var tbody = $('<tbody></tbody>');
				tbody.appendTo(table);
				////鐢熸垚缁勫悎
				var zuheDate = step.doExchange(arrayInfor);
				if (zuheDate.length > 0) {
					//鍒涘缓琛�
					$.each(zuheDate, function (index, item) {
						var td_array = item.split(',');
						var tr = $('<tr></tr>');
						tr.appendTo(tbody);
						$.each(td_array, function (i, values) {
							var td = $('<td>' + values + '</td>');
							td.appendTo(tr);
						});
						var td1 = $('<td ><input name="Txt_PriceSon" class="l-text" type="text" value=""></td>');
						td1.appendTo(tr);
						var td2 = $('<td ><input name="Txt_CountSon" class="l-text" type="text" value=""></td>');
						td2.appendTo(tr);
						//var td3 = $("<td ><input name=\"Txt_NumberSon\" class=\"l-text\" type=\"text\" value=\"\"></td>");
						//td3.appendTo(tr);
						//var td4 = $("<td ><input name=\"Txt_SnSon\" class=\"l-text\" type=\"text\" value=\"\"></td>");
						//td4.appendTo(tr);
					});
				}

				arrayColumn.pop();

				$(table).mergeCell({
					cols: arrayColumn,
				});
			} else {
				document.getElementById('createTable').innerHTML = '';
			}
		},
		hebingFunction: function () {
			$.fn.mergeCell = function (options) {
				return this.each(function () {
					var cols = options.cols;
					for (var i = cols.length - 1; cols[i] != undefined; i--) {
						// console.debug(cols[i]);
						mergeCell($(this), cols[i]);
					}
					dispose($(this));
				});
			};
			function mergeCell($table, colIndex) {
				$table.data('col-content', '');
				$table.data('col-rowspan', 1);
				$table.data('col-td', $());
				$table.data('trNum', $('tbody tr', $table).length);
				$('tbody tr', $table).each(function (index) {
					var $td = $('td:eq(' + colIndex + ')', this);

					var currentContent = $td.html();

					if ($table.data('col-content') == '') {
						$table.data('col-content', currentContent);
						$table.data('col-td', $td);
					} else {
						if ($table.data('col-content') == currentContent) {
							var rowspan = $table.data('col-rowspan') + 1;
							$table.data('col-rowspan', rowspan);

							$td.hide();

							if (++index == $table.data('trNum')) $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
						} else {
							if ($table.data('col-rowspan') != 1) {
								$table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
							}

							$table.data('col-td', $td);
							$table.data('col-content', $td.html());
							$table.data('col-rowspan', 1);
						}
					}
				});
			}

			function dispose($table) {
				$table.removeData();
			}
		},

		doExchange: function (doubleArrays) {
			var len = doubleArrays.length;
			if (len >= 2) {
				var arr1 = doubleArrays[0];
				var arr2 = doubleArrays[1];
				var len1 = doubleArrays[0].length;
				var len2 = doubleArrays[1].length;
				var newlen = len1 * len2;
				var temp = new Array(newlen);
				var index = 0;
				for (var i = 0; i < len1; i++) {
					for (var j = 0; j < len2; j++) {
						temp[index] = arr1[i] + ',' + arr2[j];
						index++;
					}
				}
				var newArray = new Array(len - 1);
				newArray[0] = temp;
				if (len > 2) {
					var _count = 1;
					for (var i = 2; i < len; i++) {
						newArray[_count] = doubleArrays[i];
						_count++;
					}
				}
				//console.log(newArray);
				return step.doExchange(newArray);
			} else {
				return doubleArrays[0];
			}
		},
	};
	return step;
});
