# لمّة — تطبيق أندرويد

الكود الأصلي (HTML/CSS/JS) في مجلد `www/`، ومغلّف بـ Capacitor في مجلد `android/`.

## بناء الـ APK

### الطريقة 1: Android Studio
1. ثبّت Node.js و Android Studio.
2. `npm install`
3. بعد أي تعديل في `www/`: `npx cap sync android`
4. `npx cap open android` ثم Build > Build APK(s).
   الملف بيطلع في `android/app/build/outputs/apk/debug/app-debug.apk`.

### الطريقة 2: GitHub Actions (من غير ما تثبّت حاجة)
ارفع المشروع على GitHub (branch اسمه `main`)، وافتح تبويب Actions،
وبعد ما الـ workflow يخلص نزّل الـ artifact اسمه `lamma-apk`.

## التثبيت على الموبايل
انقل `app-debug.apk` للموبايل وافتحه، وفعّل "التثبيت من مصادر غير معروفة" لو طلب.
