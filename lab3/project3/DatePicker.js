'use strict';

var DatePicker = function DatePicker(id, callback) {
    this.id = id;
    this.callback = callback;
};

DatePicker.prototype.nameOfMonth = function nameOfMonth(indexOfMonth) {
    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    return monthNames[indexOfMonth];
};

DatePicker.prototype.renderTable = function renderTable(nameOfMonth, year) {
    document.getElementById(this.id).innerHTML = ['<table>','<thead>','<tr>',
    '<th class="month-back">&lt;</th>',
    '<th colspan="5">', nameOfMonth.slice(0, 3), ' ', year, '</th>',
        '<th class="month-forward">&gt;</th>','</tr>','<tr>',
        '<th>Su</th>','<th>Mo</th>', '<th>Tu</th>','<th>We</th>','<th>Th</th>','<th>Fr</th>','<th>Sa</th>',
        '</tr>','</thead>',  '<tbody>','</tbody>','</table>'].join('');
};


DatePicker.prototype.render = function render(date) {
    let month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear(),
        indexOfMonth = date.getMonth(),
        self = this,
        tempDate = new Date(year,indexOfMonth, day),
        tempDay = tempDate.getDate(),
        calendarBody,
        daysHtml = '',
        i,
        selectables,
        selectableHandler;

    this.callback(this.id, { month: month, day: day, year: year });

    this.renderTable(this.nameOfMonth(indexOfMonth), year);

    document.querySelector('#' + this.id + ' .month-back')
        .addEventListener('click', function () {
            self.render(new Date(year, indexOfMonth - 1));
        });
    document.querySelector('#' + this.id + ' .month-forward')
        .addEventListener('click', function () {
            self.render(new Date(year, indexOfMonth + 1));
        });

    tempDate.setDate(1);
    if (tempDate.getDay() !== 0) {
        tempDate.setDate(1 - tempDate.getDay());
    }

    calendarBody = document.querySelector('#' + this.id + ' tbody');
    while (tempDate.getMonth() % 12 !== (indexOfMonth + 1) % 12) {
        daysHtml += '<tr>';
        for (i = 0; i < 7; i ++) {
            tempDay = tempDate.getDate();
            if (tempDate.getMonth() % 12 !== indexOfMonth % 12) {
                daysHtml += '<td class="non-active">' + tempDay + '</td>';
            } else if (tempDay === day) {
                daysHtml += '<td class="active">' + tempDay + '</td>';
            } else {
                daysHtml += '<td class="selectable-day">' + tempDay + '</td>';
            }
            tempDate.setDate(tempDay + 1);
        }
        daysHtml += '</tr>';
    }
    calendarBody.innerHTML = daysHtml;

    // selectables = document.querySelectorAll('#' + this.id + ' .selectable-day');
    // selectableHandler = function selectableHandler(event) {
    //    self.render(new Date(
    //         year,
    //         indexOfMonth,
    //         event.target.textContent 
    //     ));
    // };
    // for (i = 0; i < selectables.length; i ++) {
    //     selectables[i].addEventListener('click', selectableHandler);
    // }
};