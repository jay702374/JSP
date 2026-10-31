import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuotationEstimate, generateEnquiryId, buildWhatsAppLink } from './quotation.js';
import { isValidIndianPhone, isValidEmail } from './validation.js';

test('calculateQuotationEstimate generates lead time and notes without price, weight, or size calculation', () => {
  const result = calculateQuotationEstimate({
    category: 'Gates',
    material: 'Mild Steel (MS)',
    gauge: '14 Gauge (Standard 2.0mm)',
    quantity: 1,
    finish: 'Primer + Enamel Paint',
  });

  assert.ok(result.leadTimeDays.length > 0, 'Lead time should be specified');
  assert.ok(result.gaugeRecommendation.length > 0, 'Should include gauge recommendation');
  assert.ok(result.notes.length >= 2, 'Should include notes explaining estimation');
});

test('calculateQuotationEstimate adjusts lead time for larger batches', () => {
  const smallBatch = calculateQuotationEstimate({
    category: 'Railings',
    material: 'Stainless Steel (SS 304)',
    gauge: '16 Gauge (Medium 1.5mm)',
    quantity: 1,
    finish: 'Buffed Glossy (SS)',
  });

  const largeBatch = calculateQuotationEstimate({
    category: 'Railings',
    material: 'Stainless Steel (SS 304)',
    gauge: '16 Gauge (Medium 1.5mm)',
    quantity: 10,
    finish: 'Buffed Glossy (SS)',
  });

  assert.notEqual(smallBatch.leadTimeDays, largeBatch.leadTimeDays);
});

test('generateEnquiryId produces unique formatted ID', () => {
  const id1 = generateEnquiryId();
  const id2 = generateEnquiryId();

  assert.match(id1, /^JSP-ENQ-[A-Z0-9]+$/);
  assert.notEqual(id1, id2, 'Generated IDs should be unique');
});

test('buildWhatsAppLink generates valid URL with single phone number 7023746632', () => {
  const url = buildWhatsAppLink({
    phone: '7023746632',
    enquiryId: 'JSP-ENQ-TEST1',
    customerName: 'Ramesh Sharma',
    category: 'Railings',
    productName: 'Balcony Railing',
    specs: 'SS 304',
  });

  assert.ok(url.startsWith('https://wa.me/917023746632?text='));
  assert.ok(url.includes('JSP-ENQ-TEST1'));
  assert.ok(url.includes('Ramesh%20Sharma') || url.includes('Ramesh'));
});

test('isValidIndianPhone validates valid and invalid 10-digit Indian phone numbers', () => {
  assert.equal(isValidIndianPhone('7023746632'), true);
  assert.equal(isValidIndianPhone('+91 7023746632'), true);
  assert.equal(isValidIndianPhone('07023746632'), true);
  assert.equal(isValidIndianPhone('12345'), false);
  assert.equal(isValidIndianPhone('1234567890'), false);
  assert.equal(isValidIndianPhone(''), false);
});

test('isValidEmail validates emails correctly', () => {
  assert.equal(isValidEmail('jaykumar702374@gmail.com'), true);
  assert.equal(isValidEmail('client@jspforgecore.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
});
