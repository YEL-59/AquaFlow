# TASK-026: Bangladesh SMS Gateway Alerts & Customer Notification Engine

> **Status**: `READY`  
> **Assignee**: `edith` (Backend), `friday` (Frontend)  
> **Priority**: `P1` (High)  
> **Dependencies**: `TASK-025` (Live Maps & Tracking), `TASK-011` (Orders), `TASK-017` (Subscriptions) (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As an AquaFlow customer and dispatch operator, integrate an authentic **Bangladesh SMS Gateway & Notification Engine** (supporting Greenweb BD / SSL Wireless / Onnorokom SMS APIs with a resilient fallback and simulation mode). Deliver instant transactional SMS alerts in both English and Bengali for:
1. **Order Confirmation & Digital Payment Receipt**: Order reference, amount paid via bKash/SSLCOMMERZ, and expected delivery window.
2. **Delivery Van Dispatched**: Driver name, direct phone call number, and live tracking map link.
3. **Empty Jar Collection Reminder**: Reminding apartment dwellers to keep empty 20L jars outside for courier collection to avoid deposit charges.
4. **Subscription Auto-Renewal & Delivery Scheduled**: Next morning's 20L water replenishment alert.

---

## 2. Technical Blueprint & Scope

### 2.1 Backend Notification Service & SMS Adapter (`edith`)
- **Module**: `src/modules/notifications/`
- **Adapters**:
  - `GreenwebSMSAdapter`: Integration with `api.greenweb.com.bd/api.php` with sandbox mode and phone validation (`+8801XXXXXXXXX` / `01XXXXXXXXX`).
  - `MockSMSLogger`: Logs SMS payload with Bengali/English text and tracking token for automated testing and sandbox environments.
- **Notification Templates**:
  - `ORDER_CONFIRMED`: "AquaFlow: ধন্যবাদ! অর্ডার #AQ-XXXX নিশ্চিত হয়েছে। মোট: ৳XXX। ডেলিভারি: সকাল ৮-১০টা।"
  - `VAN_OUT_FOR_DELIVERY`: "AquaFlow: আপনার পানি নিয়ে আমাদের ভ্যান রওনা হয়েছে। ড্রাইভার: রফিক (01711XXXXXX)। লাইভ ট্র্যাক করুন: https://aquaflow.com.bd/track/AQ-XXXX"
  - `JAR_RETURN_REMINDER`: "AquaFlow: খালি জার প্রস্তুত রাখুন। আজ ডেলিভারিম্যান আসার পর ফেরত দিলে প্রতি জারে ৳২০০ রিফান্ড সমন্বয় করা হবে।"
- **REST Endpoints**:
  - `POST /api/v1/notifications/send-sms` (Admin/Internal dispatch)
  - `GET /api/v1/notifications/logs` (Admin dispatch audit log)

### 2.2 Frontend Notification Settings & Log Viewers (`friday`)
- **Customer Portal**: SMS preferences (Enable/disable delivery updates, Bangla/English language choice).
- **Admin Operations**: SMS Broadcast & Dispatch Log tab under Orders Dispatch.

---

## 3. Acceptance Criteria
- [ ] Bengali & English SMS message rendering formats without unicode corruption.
- [ ] Validates Bangladesh mobile phone numbers (`013-019` prefix, 11 digits).
- [ ] Out-for-delivery triggers automated SMS with driver contact and tracking URL.
- [ ] Unit & E2E verification tests passing.
