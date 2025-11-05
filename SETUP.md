# Setup Instructions for LandStation

## Нативные зависимости

### iOS Setup

1. Установите CocoaPods зависимости:
```bash
cd ios
pod install
cd ..
```

2. Для react-native-maps добавьте в `ios/Podfile`:
```ruby
pod 'react-native-maps', :path => '../node_modules/react-native-maps'
```

3. Для react-native-linear-gradient добавьте в `ios/Podfile`:
```ruby
pod 'BVLinearGradient', :path => '../node_modules/react-native-linear-gradient'
```

4. Для react-native-image-picker разрешения уже должны быть настроены в `Info.plist`

### Android Setup

1. Для react-native-maps добавьте в `android/app/build.gradle`:
```gradle
dependencies {
    implementation 'com.google.android.gms:play-services-maps:18.0.0'
}
```

2. Добавьте в `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.CAMERA" />
```

3. Добавьте в `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        // ...
    }
    // ...
}
```

4. Для Google Maps добавьте API ключ в `android/app/src/main/AndroidManifest.xml`:
```xml
<application>
    <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
</application>
```

## Запуск приложения

```bash
# Запустить Metro bundler
npm start

# Запустить на Android
npm run android

# Запустить на iOS
npm run ios
```

## Структура проекта

- `src/screens/` - все экраны приложения
- `src/components/` - переиспользуемые компоненты
- `src/navigation/` - навигация
- `src/utils/` - утилиты (хранилище данных)
- `src/constants/` - константы (цвета, данные)
- `src/types/` - TypeScript типы

## Функциональность

✅ Регистрация с загрузкой фото
✅ Главный экран с профилем и фактами
✅ Выбор настроения на день
✅ Календарь настроения с историей
✅ Рекомендуемые места
✅ Сохраненные места
✅ Интерактивная карта
✅ Настройки профиля и статистика
✅ Экран о приложении

Все данные хранятся локально в AsyncStorage.
