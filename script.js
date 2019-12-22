$(function () {

    let adderButtons = $('.adder');
    let adderClickCounter = 0;
    let form = $('#basket');
    let eraseAll = $('#erase');
    let totalPrice = $('#sum');
    let sum = 0.00;
    totalPrice.html(parseFloat(sum));
    updateSum(sum);

    adderButtons.on('click', function () {
        adderClickCounter++;
        if (adderClickCounter > 8) {
            alert('Twój koszyk jest pełny zBEERze');
        } else {
            let addedItemName = $(this).siblings('.item-name').clone();
            addedItemName.css('max-width', '65%');
            let eraseSingle = $('<button class="single-eraser">Usuń</button>');
            eraseSingle.css('min-width', '25%');
            eraseSingle.on('click', function () {
                adderClickCounter--;
                singleItemInChart.remove();
                let priceOfProduct = $(this).next();
                sum -= parseFloat(priceOfProduct.text());
                totalPrice.html(parseFloat(sum).toFixed(2));
                updateSum(sum);
            });
            let addedItemPrice = $(this).siblings('.unit-price').clone();
            addedItemPrice.css('min-width', '96%');
            addedItemPrice.css('max-width', 'fit-content');
            let singleItemInChart = $('<div class="single-item"></div>');
            form.append(singleItemInChart);
            singleItemInChart.append(addedItemName);
            singleItemInChart.append(eraseSingle);
            singleItemInChart.append(addedItemPrice);
            let priceOfProduct = $(this).prev();
            sum += parseFloat(priceOfProduct.text());
            totalPrice.html(parseFloat(sum).toFixed(2));
            updateSum(sum);
        }
    });

    form.on('submit', function (e) {
        e.preventDefault();
        if (form.children('.single-item').length == 0) {
            alert("Nie wybrano żadnego produktu");
        } else {
            alert('Wykonano zakupy za: ' + sum.toFixed(2) + ' zł');
            this.submit();
        }
        deleteChart();
    });

    eraseAll.on('click', function () {
        deleteChart();
        sum = 0.00;
        totalPrice.html(parseFloat(sum));
        updateSum(sum);
    });

    function deleteChart() {
        form.children('.single-item').remove();
        adderClickCounter = 0;
    }

    function updateSum(value) {
        $('#sum').text = value.toFixed(2);
    }
});