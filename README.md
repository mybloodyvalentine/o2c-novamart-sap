# Order-to-Cash (O2C) Process Tracker
### SAP SD Module + SAP Business Technology Platform (BTP) Integration

**Capstone Project | Sayandip Maji | Roll No: 23052424**  
KIIT — B.Tech Computer Science & Engineering | Batch 2023–2027  
Specialisation: SAP Business Technology Platform (BTP)

---

## Project Overview

This project presents a complete **Order-to-Cash (O2C)** business process blueprint for a fictitious company **NovaMart Global Retail Ltd.**, implemented on **SAP S/4HANA (SD Module)** and extended with **SAP BTP** as the integration, automation, and intelligence layer.

An interactive web application was built to visually simulate the O2C cycle — with step-by-step SAP transaction details, SPRO configuration paths, a live order simulator, and BTP architecture documentation.

---

## Company: NovaMart Global Retail Ltd.

| SAP Element | ID | Description |
|---|---|---|
| Company Code | NM01 | NovaMart Global Retail Ltd. |
| Sales Org | 1000/2000/3000 | Mumbai / Delhi / Bangalore |
| Distribution Channel | 10/20/30 | Retail / Wholesale / Online |
| Division | 01/02/03 | Electronics / Appliances / Grocery |
| Plant | NM10/NM20 | Mumbai WH / Delhi WH |

---

## O2C Process Steps

| Step | Document | SAP T-Code | Description |
|---|---|---|---|
| 1 | Pre-Sales Inquiry | VA11/VA12/VA13 | Customer requirement capture |
| 2 | Quotation | VA21/VA22/VA23 | Formal price & terms offer |
| 3 | Sales Order | VA01/VA02/VA03 | Order confirmation & commitment |
| 4 | Outbound Delivery | VL01N/VL02N | Pick, pack & goods issue (PGI) |
| 5 | Shipment | VT01N/VT02N | Carrier & transport management |
| 6 | Billing / Invoice | VF01/VF02/VF03 | Customer invoice generation |
| 7 | Payment Receipt | F-28 / FB05 | Incoming payment & FI clearing |

---

## SAP BTP Integration

| BTP Service | O2C Integration Point |
|---|---|
| Integration Suite | CRM → SAP Inquiry automation via iFlows |
| Build Process Automation | Credit approval workflow for high-value orders |
| SAP Event Mesh | Real-time customer notifications on PGI/Billing |
| SAP Analytics Cloud | O2C KPI dashboard — DSO, Revenue, Receivables |

---

## Project Structure

```
o2c-project/
├── index.html                          # Main web application
├── css/
│   └── style.css                       # Stylesheet
├── js/
│   └── app.js                          # Application logic + O2C data
├── Sayandip_Maji_23052424_O2C_Capstone.pdf   # Project documentation
└── README.md                           # This file
```

---

## How to Run

1. Clone the repository  
2. Open `index.html` in any modern browser  
3. No server or installation required — fully static

```bash
git clone https://github.com/<your-username>/o2c-novamart-sap
cd o2c-novamart-sap
open index.html
```

---

## Tech Stack

- **SAP S/4HANA 2023** — Core ERP (SD, FI Modules)
- **SAP BTP** — Integration Suite, Build Process Automation, Event Mesh, SAC
- **HTML5 / CSS3 / JavaScript** — Frontend web application
- **IBM Plex Sans + IBM Plex Mono** — Typography

---

## Submission Details

- **Student:** Sayandip Maji  
- **Roll Number:** 23052424  
- **Institution:** Kalinga Institute of Industrial Technology (KIIT)  
- **Programme:** B.Tech CSE 2023–2027  
- **Deadline:** April 21, 2026
