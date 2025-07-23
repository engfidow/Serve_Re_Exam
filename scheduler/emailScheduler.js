const cron = require('node-cron');
const Student = require('../models/Student');
const sendEmail = require('../utils/sendEmail');

const sendReExamNotification = async () => {
  const today = new Date();
  const month = today.getMonth(); // 0-indexed
  const day = today.getDate();

  console.log(`📅 Cron triggered - Today: ${today.toDateString()}`);

  const isMarch = month === 2 && day >= 1 && day <= 10;
  const isAugust = month === 7 && day >= 1 && day <= 10;

  if (!isMarch && !isAugust) {
    console.log('⛔ Not within March 1–10 or August 1–10. Skipping...');
    return;
  }

  const subject = 'Re-Exam Registration Reminder';
  const message = isMarch
    ? 'You can register up to 4 subjects for re-exam between March 1–10.'
    : 'You can register for all subjects you want for re-exam between August 1–10.';

  try {
    const students = await Student.find().populate('user');
    const emails = students.map(s => s.user.email);

    console.log(`📧 Sending emails to ${emails.length} students`);

    for (const email of emails) {
      await sendEmail(email, subject, message);
    }

    console.log(`✅ Emails sent to ${emails.length} students`);
  } catch (error) {
    console.error('❌ Failed to send emails:', error.message);
  }
};

// ⏰ Run every minute for testing (change later to '0 8 * * *')
cron.schedule('* * * * *', () => {
  sendReExamNotification();
  console.log('🚀 Cron job executed.');
});
