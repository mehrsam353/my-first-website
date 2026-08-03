// script.js

// ۱. دریافت اطلاعات از LocalStorage هنگام لود شدن صفحه
let inventory = JSON.parse(localStorage.getItem('myInventory')) || [];

// نمایش اولیه لیست
renderTable();

function addItem() {
    const nameInput = document.getElementById('itemName');
    const qtyInput = document.getElementById('itemQty');

    const name = nameInput.value.trim();
    const qty = parseInt(qtyInput.value);

    // بررسی اینکه ورودی‌ها خالی نباشند
    if (name === "" || isNaN(qty)) {
        alert("لطفاً نام و تعداد را درست وارد کنید!");
        return;
    }

    // ۲. اضافه کردن شیء جدید به آرایه
    const newItem = {
        id: Date.now(), // یک شناسه منحصر به فرد با زمان
        name: name,
        qty: qty
    };

    inventory.push(newItem);
    
    // ۳. ذخیره در LocalStorage و بروزرسانی صفحه
    saveAndRefresh();

    // پاک کردن فرم
    nameInput.value = "";
    qtyInput.value = "";
}

function deleteItem(id) {
    // حذف آیتم از آرایه
    inventory = inventory.filter(item => item.id !== id);
    saveAndRefresh();
}

function saveAndRefresh() {
    // ذخیره در حافظه مرورگر
    localStorage.setItem('myInventory', JSON.stringify(inventory));
    // بازسازی جدول
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = ""; // پاک کردن جدول فعلی

    inventory.forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>
                    <button class="delete-btn" onclick="deleteItem(${item.id})">حذف</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
