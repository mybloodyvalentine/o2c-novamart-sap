// =========================================
// NovaMart O2C Process Application
// SAP SD + BTP Capstone | Sayandip Maji
// =========================================

const O2C_STEPS = {
  1: {
    title: "Pre-Sales Inquiry",
    icon: "📋",
    tcode: "VA11 / VA12 / VA13",
    desc: "The O2C process begins when a potential customer expresses interest in NovaMart's products. A Pre-Sales Inquiry is raised in SAP SD to document the customer's requirements, desired materials, and quantities. This step creates a formal record in the system and allows the Sales team to assess feasibility before committing to a quote.",
    fields: [
      { label: "Document Type", value: "IN (Inquiry)" },
      { label: "Sales Org", value: "1000 (NovaMart Mumbai)" },
      { label: "Distribution Channel", value: "10 (Retail)" },
      { label: "Division", value: "01 (Electronics)" },
      { label: "Inquiry Number", value: "10000001 (auto-generated)" },
      { label: "Valid From / To", value: "18.04.2026 – 30.04.2026" },
    ],
    spro: "SPRO → Sales & Distribution → Sales → Sales Documents → Sales Document Header → Define Sales Document Types → IN",
    btp: [
      {
        name: "Integration Suite — CRM Connector",
        desc: "Incoming leads from external CRM (HubSpot/Salesforce) are automatically mapped to SAP Inquiries via a pre-built iFlow. No manual re-entry needed.",
        tag: "Cloud Integration · iFlow · API"
      }
    ]
  },
  2: {
    title: "Quotation",
    icon: "📄",
    tcode: "VA21 / VA22 / VA23",
    desc: "Based on the inquiry, a formal Quotation is prepared for the customer in SAP SD. The Quotation contains the agreed-upon price, validity period, payment terms, and delivery conditions. In SAP, the quotation is referenced from the inquiry — ensuring complete document flow traceability.",
    fields: [
      { label: "Document Type", value: "QT (Quotation)" },
      { label: "Reference Document", value: "Inquiry 10000001" },
      { label: "Pricing Procedure", value: "RVAA01 (Standard)" },
      { label: "Payment Terms", value: "NT30 (Net 30 Days)" },
      { label: "Incoterms", value: "CIF Mumbai" },
      { label: "Quotation Valid Until", value: "30.04.2026" },
    ],
    spro: "SPRO → SD → Basic Functions → Pricing → Pricing Control → Define Pricing Procedures → RVAA01",
    btp: [
      {
        name: "SAP Build Apps — Customer Portal",
        desc: "Customers can view and digitally accept quotations via a BTP-hosted self-service portal. Acceptance auto-triggers Sales Order creation in the backend.",
        tag: "Build Apps · Fiori · UX"
      }
    ]
  },
  3: {
    title: "Sales Order",
    icon: "🛒",
    tcode: "VA01 / VA02 / VA03",
    desc: "The Sales Order (SO) is the central document in the O2C process. It legally commits NovaMart to delivering the agreed goods to the customer. The SO captures material, quantity, price, delivery date, ship-to and bill-to party. Downstream documents — Delivery, Billing — all reference this SO.",
    fields: [
      { label: "Order Type", value: "OR (Standard Order)" },
      { label: "Customer", value: "CUST-1042 (Reliance Retail)" },
      { label: "Material", value: "MAT-ELEC-001 (4K Smart TV)" },
      { label: "Order Quantity", value: "50 EA" },
      { label: "Net Value", value: "₹ 12,50,000" },
      { label: "Requested Delivery", value: "25.04.2026" },
    ],
    spro: "SPRO → SD → Sales → Sales Documents → Define Schedule Line Categories → CP (MRP Relevant)",
    btp: [
      {
        name: "SAP Build Process Automation",
        desc: "Orders exceeding ₹5,00,000 trigger an automated credit-check workflow. CFO approval is routed via BTP Inbox — order is held until approved.",
        tag: "Workflow · RPA · Decision Engine"
      }
    ]
  },
  4: {
    title: "Outbound Delivery",
    icon: "📦",
    tcode: "VL01N / VL02N / VL03N",
    desc: "Once the Sales Order is confirmed, an Outbound Delivery document is created referencing the SO. The delivery document initiates the warehouse operations — pick, pack, and goods issue. Picking confirms what is physically taken from storage, while Post Goods Issue (PGI) updates inventory and triggers accounting entries.",
    fields: [
      { label: "Delivery Type", value: "LF (Outbound Delivery)" },
      { label: "Shipping Point", value: "SP01 (Mumbai Dispatch)" },
      { label: "Reference Sales Order", value: "SO 0000001234" },
      { label: "Delivery Quantity", value: "50 EA" },
      { label: "Storage Location", value: "SL01 (Main Warehouse)" },
      { label: "PGI (Goods Issue) Date", value: "23.04.2026" },
    ],
    spro: "SPRO → SD → Shipping → Deliveries → Define Delivery Types → LF",
    btp: [
      {
        name: "Event Mesh — Real-Time Tracking",
        desc: "On PGI posting, SAP fires a business event to BTP Event Mesh. This triggers SMS/email notifications to the customer with live shipment tracking.",
        tag: "Event-Driven · Pub/Sub · Notifications"
      }
    ]
  },
  5: {
    title: "Shipment",
    icon: "🚚",
    tcode: "VT01N / VT02N / VT03N",
    desc: "The Shipment document in SAP SD manages the physical transportation of goods from NovaMart's warehouse to the customer's delivery address. It consolidates one or more deliveries into a single transport, assigns the carrier, and tracks the shipment lifecycle from loading to final delivery confirmation.",
    fields: [
      { label: "Shipment Type", value: "0001 (Road Transport)" },
      { label: "Carrier", value: "Delhivery Logistics Ltd." },
      { label: "Route", value: "R001 (Mumbai → Delhi)" },
      { label: "Loading Date", value: "23.04.2026" },
      { label: "Expected Arrival", value: "25.04.2026" },
      { label: "Freight Cost", value: "₹ 18,500" },
    ],
    spro: "SPRO → SD → Transportation → Basic Transportation Functions → Routes → Define Routes",
    btp: [
      {
        name: "Integration Suite — Logistics API",
        desc: "BTP Integration Suite connects to carrier APIs (Delhivery, BlueDart) and updates SAP shipment status automatically — from In-Transit to Delivered.",
        tag: "API Management · Logistics · iFlow"
      }
    ]
  },
  6: {
    title: "Billing / Invoice",
    icon: "🧾",
    tcode: "VF01 / VF02 / VF03",
    desc: "After Post Goods Issue, a Customer Invoice (Billing Document) is created in SAP. The billing document references the delivery and generates accounting entries in FI — Customer account is debited, Revenue account is credited. The invoice is sent to the customer as a formal payment request.",
    fields: [
      { label: "Billing Type", value: "F2 (Invoice)" },
      { label: "Reference Delivery", value: "DEL 0080001230" },
      { label: "Billing Date", value: "23.04.2026" },
      { label: "Net Invoice Value", value: "₹ 12,50,000" },
      { label: "Tax (GST 18%)", value: "₹ 2,25,000" },
      { label: "Total Payable", value: "₹ 14,75,000" },
    ],
    spro: "SPRO → SD → Billing → Billing Documents → Define Billing Types → F2",
    btp: [
      {
        name: "SAP Analytics Cloud — DSO Tracking",
        desc: "BTP-embedded SAC dashboard tracks Days Sales Outstanding (DSO) per customer. Finance team gets real-time visibility into outstanding receivables without SAP GUI.",
        tag: "SAC · Analytics · Live Connection"
      }
    ]
  },
  7: {
    title: "Payment Receipt",
    icon: "💰",
    tcode: "F-28 / FB05",
    desc: "The final step in the O2C cycle is receiving payment from the customer and clearing the open invoice in SAP FI. Transaction F-28 is used to post incoming payments and clear the customer's open item. Upon clearing, the O2C cycle is complete — the customer account is settled and revenue is fully recognized.",
    fields: [
      { label: "Document Type", value: "DZ (Customer Payment)" },
      { label: "Payment Method", value: "T (Bank Transfer / RTGS)" },
      { label: "House Bank", value: "HDFC001 (NovaMart HDFC A/C)" },
      { label: "Amount Received", value: "₹ 14,75,000" },
      { label: "Clearing Date", value: "26.04.2026" },
      { label: "Customer Account", value: "CUST-1042 — CLEARED ✓" },
    ],
    spro: "SPRO → Financial Accounting → AR → Business Transactions → Incoming Payments → Define Tolerance Groups",
    btp: [
      {
        name: "SAP Analytics Cloud — Revenue Dashboard",
        desc: "Payment receipt triggers SAC story update — actual vs plan revenue chart refreshes. CFO dashboard shows cleared vs open receivables in real time.",
        tag: "SAC · Finance Analytics · Real-Time"
      }
    ]
  }
};

// Order counter
let orderCounter = 1234;

// ---- Render step detail ----
function selectStep(num) {
  // Update active pill
  document.querySelectorAll('.pipeline-step').forEach(s => s.classList.remove('active'));
  document.querySelector(`[data-step="${num}"]`).classList.add('active');

  const step = O2C_STEPS[num];
  const panel = document.getElementById('detailPanel');

  panel.innerHTML = `
    <div class="detail-step-title">
      <span>${step.icon}</span>
      <span>Step ${num}: ${step.title}</span>
      <span class="detail-tcode">${step.tcode}</span>
    </div>
    <div class="detail-desc">${step.desc}</div>
    <div class="detail-fields">
      ${step.fields.map(f => `
        <div class="detail-field">
          <span class="field-label">${f.label}</span>
          <span class="field-value">${f.value}</span>
        </div>
      `).join('')}
    </div>
    <div class="spro-path">
      <div class="spro-label">SPRO CONFIGURATION PATH</div>
      ${step.spro}
    </div>
  `;

  // BTP Panel
  const btpDiv = document.getElementById('btpServices');
  btpDiv.innerHTML = step.btp.map(b => `
    <div class="btp-service">
      <div class="btp-svc-name">${b.name}</div>
      <div class="btp-svc-desc">${b.desc}</div>
      <span class="btp-svc-tag">${b.tag}</span>
    </div>
  `).join('');
}

// ---- Order Simulator ----
function createOrder() {
  const custId = document.getElementById('custId').value || 'CUST-' + Math.floor(Math.random()*9000+1000);
  const material = document.getElementById('material').value.split('—')[0].trim();
  const qty = document.getElementById('qty').value || Math.floor(Math.random()*20+1);
  const salesOrg = document.getElementById('salesOrg').value.split('—')[0].trim();
  const log = document.getElementById('logArea');
  const soNumber = 'SO-' + (++orderCounter);

  const timestamp = () => new Date().toLocaleTimeString('en-IN', {hour12: false});

  const lines = [
    { cls: 'system', text: `[${timestamp()}] [ SAP SD ] Transaction VA01 initiated` },
    { cls: 'info',   text: `[${timestamp()}] → Sales Org: ${salesOrg} | Customer: ${custId}` },
    { cls: 'info',   text: `[${timestamp()}] → Material: ${material} | Qty: ${qty} EA` },
    { cls: 'warning',text: `[${timestamp()}] [ CHECK ] Running availability check (ATP)...` },
    { cls: 'success',text: `[${timestamp()}] [ ATP ] Material available. Confirmed qty: ${qty} EA` },
    { cls: 'warning',text: `[${timestamp()}] [ CHECK ] Credit check in progress...` },
    { cls: 'success',text: `[${timestamp()}] [ CREDIT ] Credit limit OK. Order proceeds.` },
    { cls: 'btp',    text: `[${timestamp()}] [ BTP ] Integration Suite notified → CRM updated` },
    { cls: 'success',text: `[${timestamp()}] [ SAP ] Sales Order ${soNumber} CREATED SUCCESSFULLY ✓` },
    { cls: 'btp',    text: `[${timestamp()}] [ BTP ] Build Process Automation: workflow triggered` },
    { cls: 'info',   text: `[${timestamp()}] → Next step: Create Outbound Delivery (VL01N)` },
  ];

  let delay = 0;
  lines.forEach((line, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `log-line ${line.cls}`;
      div.textContent = line.text;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;

      // Update stat counter
      if (i === lines.length - 1) {
        const el = document.getElementById('totalOrders');
        el.textContent = parseInt(el.textContent) + 1;
        const open = document.getElementById('openOrders');
        open.textContent = parseInt(open.textContent) + 1;
      }
    }, delay);
    delay += 350 + Math.random() * 200;
  });
}

// ---- Init ----
window.onload = () => selectStep(1);
