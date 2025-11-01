

    $(document).ready(function() {
        const DRUGS_DATA = [
            { name: "Paracetamol", brand: "Biogesic", price: 4.24, form: "500mg Tablet", type: "otc" },
            { name: "Ibuprofen", brand: "Medicol", price: 6.50, form: "200mg Tablet", type: "otc" },
            { name: "Naproxen", brand: "Flanax Forte", price: 23.00, form: "550mg Tablet", type: "otc" },
            { name: "Aspirin", brand: "Aspen", price: 1.58, form: "30mg Tablet", type: "otc" },
            { name: "Aspirin", brand: "Aspen", price: 2.63, form: "100mg Tablet", type: "otc" },
            { name: "Diclofenac", brand: "Diclofen", price: 1.84, form: "50mg Tablet", type: "rx" },
            { name: "Amlodipine", brand: "Cardiovasc", price: 6.04, form: "5mg Tablet", type: "rx" },
            { name: "Losartan", brand: "Hypertan", price: 4.99, form: "50mg Tablet", type: "rx" },
            { name: "Atenolol", brand: "Atenol-50", price: 3.68, form: "50mg Tablet", type: "rx" },
            { name: "Metoprolol", brand: "Angimet", price: 3.41, form: "100mg Tablet", type: "rx" },
            { name: "Enalapril", brand: "Azepril", price: 5.78, form: "5mg Tablet", type: "rx" },
            { name: "Enalapril", brand: "Vazotec", price: 7.09, form: "10mg Tablet", type: "rx" },
            { name: "Simvastatin", brand: "Buztin", price: 5.25, form: "20mg Tablet", type: "rx" },
            { name: "Atorvastatin", brand: "Atorvast", price: 12.08, form: "20mg Tablet", type: "rx" },
            { name: "Rosuvastatin", brand: "Ambica", price: 16.80, form: "20mg Tablet", type: "rx" },
            { name: "Metformin", brand: "Diamet", price: 2.10, form: "500mg Tablet", type: "rx" },
            { name: "Ganoderma Ginseng", brand: "Lingzhi", price: 11.50, form: "400mg Capsule", type: "otc" },
            { name: "Glimepiride", brand: "Arya", price: 16.50, form: "3mg Tablet", type: "rx" },
            { name: "Clopidrogel", brand: "Angiogrel", price: 11.55, form: "75mg Tablet", type: "rx" },
            { name: "Dexamethasone", brand: "Medrone", price: 2.36, form: "500mcg Tablet", type: "rx" },
            { name: "Amoxicillin", brand: "Amoxil", price: 4.46, form: "500mg Capsule", type: "rx" },
            { name: "Co-amoxiclav", brand: "Augmentin", price: 42.00, form: "500mg/125mg Tablet", type: "rx" },
            { name: "Azithromycin", brand: "Zithrox", price: 122.00, form: "500mg Tablet", type: "rx" },
            { name: "Clarithromycin", brand: "Klacid", price: 31.50, form: "500mg Tablet", type: "rx" },
            { name: "Levofloxacin", brand: "Levoquin", price: 29.66, form: "500mg Tablet", type: "rx" },
            { name: "Doxofylline", brand: "Doxofyl", price: 19.50, form: "200mg Tablet", type: "rx" },
            { name: "Cefalexin", brand: "Cefalin", price: 8.93, form: "250mg Capsule", type: "rx" },
            { name: "Clindamycin", brand: "Clinda", price: 9.71, form: "150mg Capsule", type: "rx" },
            { name: "Trimetazidine", brand: "Vastarel", price: 12.34, form: "35mg Tablet", type: "rx" },
            { name: "Metronidazole", brand: "Flagyl", price: 2.75, form: "500mg Tablet", type: "rx" },
            { name: "Omeprazole", brand: "Losec", price: 6.30, form: "20mg Capsule", type: "rx" },
            { name: "Esomeprazole", brand: "Nexium", price: 26.25, form: "40mg Tablet", type: "rx" },
            { name: "Ranitidine", brand: "Zantac", price: 3.15, form: "150mg Tablet", type: "rx" },
            { name: "Antacid", brand: "Kremil-S", price: 4.20, form: "300mg/200mg ChewTablet", type: "otc" },
            { name: "Salbutamol", brand: "Ventolin", price: 49.35, form: "60ml Syrup", type: "rx" },
            { name: "Salbutamol", brand: "Ventolin", price: 1.84, form: "2mg Tablet", type: "rx" },
            { name: "Furesomide", brand: "Lasix", price: 2.89, form: "20mg Tablet", type: "rx" },
            { name: "Fluticasone P.", brand: "Flixotide", price: 342.50, form: "0.05% 5g Cream", type: "rx" },
            { name: "Montelukast", brand: "Singulair", price: 17.85, form: "5mg Tablet", type: "rx" },
            { name: "Cetirizine", brand: "Allerzine", price: 2.63, form: "10mg Tablet", type: "otc" },
            { name: "Loratadine", brand: "Claritine", price: 5.00, form: "10mg Tablet", type: "otc" },
            { name: "Chlorpheniramine", brand: "Piriton", price: 2.63, form: "5mg Tablet", type: "otc" },
            { name: "Domperidone", brand: "Motilium", price: 5.51, form: "10mg Tablet", type: "rx" },
            { name: "Dextromethorphan", brand: "Robitussin", price: 1.75, form: "10mg Tablet", type: "otc" },
            { name: "Diazepam", brand: "Valium", price: 11.00, form: "5mg Tablet", type: "rx" },
            { name: "Fluoxetine", brand: "Prozac", price: 41.25, form: "20mg Capsule", type: "rx" },
            { name: "Sertraline", brand: "Zoloft", price: 44.00, form: "50mg Tablet", type: "rx" },
            { name: "Hydrochlorothiazide", brand: "HCTZ", price: 4.90, form: "12.5mg Tablet", type: "rx" },
            { name: "Spironolactone", brand: "Aldactone", price: 6.50, form: "25mg Tablet", type: "rx" },
            { name: "Warfarin", brand: "Coumadin", price: 26.50, form: "1mg Tablet", type: "rx" },
            { name: "Ferrous sulfate", brand: "Ferlin", price: 2.25, form: "60mg Tablet", type: "otc" },
            { name: "Folic acid", brand: "Folart", price: 3.50, form: "5mg Capsule", type: "otc" },
            { name: "Vitamin C", brand: "Ascorbic", price: 2.50, form: "100mg Tablet", type: "otc" },
            { name: "Multivitamin", brand: "Centrum", price: 10.75, form: "Tablet", type: "otc" },
            { name: "Calcium carbonate", brand: "Caltrate", price: 2.75, form: "500mg Tablet", type: "otc" },
            { name: "Methylprednisolone", brand: "Medrol", price: 9.00, form: "4mg Tablet", type: "rx" },
            { name: "Hydrocortisone", brand: "Hydrotopic", price: 140.00, form: "1% 5g Tube", type: "rx" },
            { name: "Mupirocin", brand: "Mupicore", price: 162.00, form: "2% 5g Tube", type: "rx" },
            { name: "Clotrimazole", brand: "Canesten", price: 136.00, form: "1% 3.5g Tube", type: "rx" },
            { name: "Fluconazole", brand: "Mycozole", price: 171.75, form: "50mg Capsule", type: "rx" },
            { name: "Ketoconazole", brand: "Ambica", price: 136.50, form: "2% 15g Cream", type: "rx" },
            { name: "Loperamide", brand: "Diatabs", price: 8.75, form: "2mg Capsule", type: "otc" },
            { name: "Oral rehydration salts", brand: "Hydrite", price: 16.50, form: "2.17g Sachet", type: "otc" },
            { name: "Sitagliptin", brand: "Philsitz", price: 19.00, form: "50mg Tablet", type: "rx" },
            { name: "Empagliflozin", brand: "Jardiance", price: 53.75, form: "10mg Tablet", type: "rx" },
            { name: "Allopurinol", brand: "Urisol", price: 1.75, form: "100mg Tablet", type: "rx" },
            { name: "Colchicine", brand: "Goutsaph", price: 3.50, form: "500mcg Tablet", type: "rx" },
            { name: "Chloramphenicol", brand: "Zinett", price: 5.00, form: "500mg Capsule", type: "rx" },
            { name: "Tetracycline", brand: "Tricor", price: 10.50, form: "500mg Capsule", type: "rx" },
            { name: "Prednisolone", brand: "Celsus", price: 210.00, form: "1% 5ml Bottle", type: "rx" },
            { name: "Benzathine Penicillin G", brand: "Zalpen", price: 259.00, form: "1.2m units Solution Vial", type: "rx" },
            { name: "Clotrimazole", brand: "Trimacort", price: 130.20, form: "1% 20g Cream", type: "rx" },
            { name: "Dibencozide", brand: "Heraclene Forte", price: 51.25, form: "3mg Capsule", type: "rx" },
            { name: "Salicylic acid", brand: "Rhea", price: 22.00, form: "10% 15ml Bottle", type: "otc" },
            { name: "Benzoyl peroxide", brand: "Benzac", price: 523.50, form: "15g Bottle", type: "rx" },
            { name: "Sildenafil", brand: "Viagra", price: 49.00, form: "50mg Tablet", type: "rx" },
            { name: "Tamsulosin", brand: "Flomax", price: 37.01, form: "400mcg Tablet", type: "rx" },
            { name: "Finasteride", brand: "Proscar", price: 27.04, form: "5mg Tablet", type: "rx" },
            { name: "Meclizine", brand: "Bonamine", price: 14.75, form: "25mg ChewTablet", type: "otc" },
            { name: "Potassium citrate", brand: "Urocit-K", price: 11.00, form: "1080mg ERTablet", type: "rx" },
            { name: "Ondansetron", brand: "Zofran", price: 107.00, form: "8mg Tablet", type: "rx" },
            { name: "Sodium bicarbonate", brand: "Neutracid", price: 200.00, form: "650mg Tablet", type: "otc" },
            { name: "Pantoprazole", brand: "Pantoloc", price: 9.71, form: "40mg Tablet", type: "rx" },
            { name: "Mefenamic", brand: "Ponstan", price: 3.15, form: "500mg Tablet", type: "otc" },
            { name: "Piracetam", brand: "Nootropil", price: 10.50, form: "800mg Tablet", type: "rx" },
            { name: "Ibuprofen + Paracetamol", brand: "Alaxan", price: 10.00, form: "200mg Tablet", type: "otc" },
            { name: "Lagundi", brand: "Ascof Forte", price: 121.20, form: "600mg/5ml Bottle", type: "otc" },
            { name: "Oxymetazoline", brand: "Drixine", price: 185.75, form: "10ml Bottle", type: "otc" },
            { name: "Cefuroxime", brand: "Zinacef", price: 16.50, form: "250mg Tablet", type: "rx" },
            { name: "Cefuroxime", brand: "Zinacef", price: 22.00, form: "500mg Tablet", type: "rx" },
            { name: "Telmisartan", brand: "Micardis", price: 28.00, form: "40mg Tablet", type: "rx" },
            { name: "Levocetirizine", brand: "Xyzal", price: 12.00, form: "5mg Tablet", type: "otc" },
            { name: "Dextrose", brand: "D5W", price: 150.00, form: "5% 500ml Solution", type: "rx" }
        ];
        
        let products = [];
        const savedProducts = localStorage.getItem('productList');
        const savedAvailabilityMap = savedProducts ? JSON.parse(savedProducts) : {};

        products = DRUGS_DATA.map(drug => {
            const uniqueKey = `${drug.name}|${drug.brand}|${drug.form}`;
            const isAvailable = savedAvailabilityMap[uniqueKey] !== undefined ? savedAvailabilityMap[uniqueKey] : true;
            
            return {
                ...drug,
                uniqueKey: uniqueKey,
                available: isAvailable
            };
        });

        function renderProducts() {
            const list = $('#productList');
            list.empty();
            let availabilityToSave = {};

            products.forEach((product) => {
                const checked = product.available ? 'checked' : '';
                const dimClass = product.available ? '' : 'dimmed-style';
                
                availabilityToSave[product.uniqueKey] = product.available;
                
                list.append(`
                <div class="setting-item ${dimClass}">
                    <label class="product-label ${product.type}">
                        <span class="product-info">
                            <span class="product-info-name">
                                ${product.name} (<span class="product-brand">${product.brand}</span>)
                            </span> 
                            <span class="product-info-form">${product.form}</span>
                        </span>
                        <div class="switch">
                            <input type="checkbox" class="product-toggle" data-key="${product.uniqueKey}" id="${product.uniqueKey.replace(/[^a-zA-Z0-9]/g, '-')}" ${checked}>
                            <span class="slider round"></span>
                        </div>
                    </label>
                </div>
                `);
            });
            
            localStorage.setItem('productList', JSON.stringify(availabilityToSave));
        }

        renderProducts();

        $(document).on('change', '.product-toggle', function() {
            const key = $(this).data('key'); 
            const isChecked = this.checked;
            const product = products.find(p => p.uniqueKey === key);
            
            if (product) {
                product.available = isChecked;
                
                const $item = $(this).closest('.setting-item');
                if (isChecked) {
                    $item.removeClass('dimmed-style');
                } else {
                    $item.addClass('dimmed-style');
                }

                const savedProducts = localStorage.getItem('productList');
                let availabilityMap = savedProducts ? JSON.parse(savedProducts) : {};
                availabilityMap[key] = isChecked;
                localStorage.setItem('productList', JSON.stringify(availabilityMap));
            }
        });

        $('#SaveSettingsBtn').on('click', function() {
            const settings = {
                storeName: $('#storeName').val(),
                storeAddress: $('#storeAddress').val(),
                storePhone: $('#storePhone').val(),
                receiptHeader: $('#receiptHeader').val(),
                receiptFooter: $('#receiptFooter').val(),
                receiptWidth: $('#receiptWidth').val(),
                vatRate: parseFloat($('#vatRate').val()),
                discountRate: parseFloat($('#discountRate').val()),
                cashierName: $('#cashierName').val(),
                autoLogout: parseInt($('#autoLogout').val())
            };
            localStorage.setItem('posSettings', JSON.stringify(settings));
            alert('Settings and product list saved successfully!');
        });

        $('#ResetSettingsBtn').on('click', function() {
            if (confirm('Are you sure you want to reset all settings to default?')) {
                $('#storeName').val('PharmaCare Pharmacy');
                $('#storeAddress').val('123 Main Street, Pasig City');
                $('#storePhone').val('(02) 1234-5678');
                $('#receiptHeader').val('PharmaCare Pharmacy');
                $('#receiptFooter').val('Thank you for your purchase!');
                $('#receiptWidth').val('58');
                $('#vatRate').val('12');
                $('#discountRate').val('20');
                $('#cashierName').val('Edlon Manaloto');
                $('#autoLogout').val('30');
                
                localStorage.removeItem('posSettings');
                localStorage.removeItem('productList');
                alert('Settings reset to default!');
                location.reload();
            }
        });

        const savedSettings = localStorage.getItem('posSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            $('#storeName').val(settings.storeName || 'PharmaCare Pharmacy');
            $('#storeAddress').val(settings.storeAddress || '123 Main Street, Pasig City');
            $('#storePhone').val(settings.storePhone || '(02) 1234-5678');
            $('#receiptHeader').val(settings.receiptHeader || 'PharmaCare Pharmacy');
            $('#receiptFooter').val(settings.receiptFooter || 'Thank you for your purchase!');
            $('#receiptWidth').val(settings.receiptWidth || '58');
            $('#vatRate').val(settings.vatRate || 12);
            $('#discountRate').val(settings.discountRate || 20);
            $('#cashierName').val(settings.cashierName || 'Edlon Manaloto');
            $('#autoLogout').val(settings.autoLogout || 30);
        }
    });