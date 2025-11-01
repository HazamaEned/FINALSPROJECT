   function goBack() {
            if (document.referrer.includes('cashier-ui.html')) {
                window.location.href = 'cashier-ui.html';
            } else if (document.referrer.includes('admin.html')) {
                window.location.href = 'admin.html';
            } else {
                window.history.back();
            }
        }

        $(document).ready(function() {
            const today = "2024-01-15";
            $('#SingleDate').val(today);
            $('#StartDate').val(today);
            $('#EndDate').val(today);
            $('#HistoryDay').val(today);

            const transactions = [
                { id: "TXN001", date: "2024-01-15 14:30:25", customer: "edlon", items: [{ name: "Aspirin", type: "otc", price: 0.44, quantity: 2 }, { name: "Paracetamol", type: "otc", price: 0.34, quantity: 1 }], total: 1.22, paymentMethod: "Cash", cashier: "ened" }
            ];

            const availableItems = [
                { name: "Aspirin", price: 0.44, type: "otc" },
                { name: "Paracetamol", price: 0.34, type: "otc" }
            ];

            let filteredTransactions = transactions;
            let selectedTransaction = null;

            function displayDailySummary(transactions) {
                const totalSales = transactions.reduce((sum, t) => sum + t.total, 0);
                const totalTransactions = transactions.length;
                const cashTotal = transactions.filter(t => t.paymentMethod === 'Cash').reduce((sum, t) => sum + t.total, 0);
                const digitalTotal = totalSales - cashTotal;
                $('#TotalSalesValue').text(`₱${totalSales.toFixed(2)}`);
                $('#TotalTransactionsValue').text(totalTransactions);
                $('#CashPaymentsValue').text(`₱${cashTotal.toFixed(2)}`);
                $('#DigitalPaymentsValue').text(`₱${digitalTotal.toFixed(2)}`);
            }

            function displayTransactions(data) {
                const list = $('#TransactionList');
                list.empty();
                if (data.length === 0) {
                    list.html('<div class="no-transactions">No transactions found</div>');
                    return;
                }
                data.forEach(transaction => {
                    const hasOTC = transaction.items.some(item => item.type === 'otc');
                    const itemsList = transaction.items.map(item =>
                        `<div class="transaction-item">
                            <span class="item-name">${item.name}</span>
                            <span class="item-type ${item.type}">${item.type.toUpperCase()}</span>
                            <span class="item-quantity">Qty: ${item.quantity}</span>
                            <span class="item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
                        </div>`
                    ).join('');

                    const exchangeButton = hasOTC ? `<button class="exchange-btn" data-transaction-id="${transaction.id}">Exchange Item</button>` : '<span class="no-exchange">RX Only</span>';

                    const card = `
                        <div class="transaction-card">
                            <div class="transaction-header">
                                <div class="transaction-id">${transaction.id}</div>
                                <div class="transaction-date">${transaction.date}</div>
                            </div>
                            <div class="transaction-details">
                                <div class="customer-info"><strong>Customer:</strong> ${transaction.customer}</div>
                                <div class="cashier-info"><strong>Cashier:</strong> ${transaction.cashier}</div>
                                <div class="items-section"><strong>Items:</strong><div class="items-list">${itemsList}</div></div>
                                <div class="transaction-total"><strong>Total: ₱${transaction.total.toFixed(2)}</strong><span class="payment-method">${transaction.paymentMethod}</span></div>
                                <div class="transaction-actions">${exchangeButton}</div>
                            </div>
                        </div>
                    `;
                    list.append(card);
                });
            }

            function applyFilter() {
                const filter = $('#ItemTypeFilter').val();
                let filtered = filteredTransactions;
                if (filter === 'otc') filtered = filtered.filter(t => t.items.some(i => i.type === 'otc'));
                if (filter === 'rx') filtered = filtered.filter(t => t.items.some(i => i.type === 'rx'));
                displayTransactions(filtered);
            }

            $('#SearchBtn').on('click', function() {
                const s = $('#TransactionSearch').val().toLowerCase();
                filteredTransactions = s ? transactions.filter(t => t.id.toLowerCase().includes(s)) : transactions;
                applyFilter();
            });

            $('#ItemTypeFilter').on('change', applyFilter);

            $(document).on('click', '.exchange-btn', function() {
                const id = $(this).data('transaction-id');
                selectedTransaction = transactions.find(t => t.id === id);
                if (!selectedTransaction) return;

                const otcItems = selectedTransaction.items.filter(i => i.type === 'otc');
                $('#OriginalItemInfo').html(otcItems.map(i => `<div>${i.name} - Qty: ${i.quantity} - ₱${(i.price * i.quantity).toFixed(2)}</div>`).join(''));

                const select = $('#NewItemSelect');
                select.empty().append('<option value="">Choose replacement item...</option>');
                availableItems.forEach(i => select.append(`<option value="${i.name}" data-price="${i.price}">${i.name} - ₱${i.price.toFixed(2)}</option>`));

                $('#ExchangeModal').css('display', 'flex');
            });

            $('#NewItemSelect').on('change', function() {
                const sel = $(this).find('option:selected');
                const name = sel.val();
                const price = parseFloat(sel.data('price'));
                if (!name) {
                    $('#NewItemInfo').empty();
                    $('#PriceDifference').empty();
                    return;
                }
                const originalTotal = selectedTransaction.items.filter(i => i.type === 'otc').reduce((s, i) => s + (i.price * i.quantity), 0);
                const diff = price - originalTotal;
                $('#NewItemInfo').html(`<div>${name} - ₱${price.toFixed(2)}</div>`);
                $('#PriceDifference').html(`<div>${diff > 0 ? `Customer owes: ₱${diff.toFixed(2)}` : `Refund: ₱${Math.abs(diff).toFixed(2)}`}</div>`);
            });

            $('#ConfirmExchangeBtn').on('click', function() {
                const name = $('#NewItemSelect').val();
                if (!name) return;
                $('#ExchangeModal').hide();
                alert('Exchange processed');
            });

            $('#CancelExchangeBtn').on('click', function() {
                $('#ExchangeModal').hide();
            });

            function updateDateInputVisibility() {
                const val = $('input[name="report_period"]:checked').val();
                $('#SingleDate').toggle(val === 'specific');
                $('#RangeDates').toggle(val === 'range');
            }

            $('input[name="report_period"]').on('change', updateDateInputVisibility);
            updateDateInputVisibility();

            function getReportPeriod() {
                const val = $('input[name="report_period"]:checked').val();
                if (val === 'today') return today;
                if (val === 'specific') return $('#SingleDate').val();
                if (val === 'range') return `${$('#StartDate').val()} to ${$('#EndDate').val()}`;
            }

            function updateHistoryInputs() {
                const val = $('#HistoryRange').val();
                $('#HistoryDay').toggle(val === 'day');
                $('#HistoryWeek').toggle(val === 'week');
                $('#HistoryMonth').toggle(val === 'month');
            }

            $('#HistoryRange').on('change', updateHistoryInputs);
            updateHistoryInputs();

            function getHistoryPeriod() {
                const mode = $('#HistoryRange').val();
                if (mode === 'day') return $('#HistoryDay').val();
                if (mode === 'week') return $('#HistoryWeek').val();
                if (mode === 'month') return $('#HistoryMonth').val();
            }

            $('#PrintSummaryBtn').on('click', function() {
                alert(`Simulating Print for: ${getReportPeriod()}`);
            });

            $('#ExportDataBtn').on('click', function() {
                alert(`Simulating Export for: ${getReportPeriod()}`);
            });

            $('#PrintHistoryBtn').on('click', function() {
                alert('Printing Transaction History for ' + getHistoryPeriod());
            });

            $('#ExportHistoryBtn').on('click', function() {
                alert('Exporting Transaction History for ' + getHistoryPeriod());
            });

            displayDailySummary(transactions);
            displayTransactions(transactions);
        });