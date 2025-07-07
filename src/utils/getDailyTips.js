export default function getDailyTips(
  showTips,
  dailyData,
  locationName = "your area"
) {
  const tips = new Set();
  const temp = dailyData?.temp_c ?? 21;
  const rain = dailyData?.precip_mm ?? 0;
  const wind = dailyData?.wind_kph ?? 0;
  const humidity = dailyData?.humidity ?? 0;
  const conditionText = dailyData?.condition?.text?.toLowerCase() ?? "";

  // 🌡 Temperature-based suggestions
  if (temp <= 12) {
    tips.add(
      `🧥 It's quite cold in ${locationName} — layer up with warm clothes, gloves, and maybe a scarf.`
    );
    tips.add(
      `🚶‍♂️ If you're walking, keep moving to stay warm and try a warm drink on the go.`
    );
  } else if (temp <= 20) {
    tips.add(
      `🧣 Chilly in ${locationName} today — a light jacket or hoodie should do.`
    );
  } else if (temp >= 30) {
    tips.add(
      `☀️ It's hot in ${locationName} — wear white or light-colored clothes to stay cool.`
    );
    tips.add(
      `🧴 Don’t forget sunscreen, and take water if you’ll be outside long.`
    );
  } else {
    tips.add(
      `👕 Great weather in ${locationName} — perfect for a walk in breathable clothing.`
    );
  }

  // 🌧 Rain-related suggestions
  if (rain >= 3) {
    tips.add(
      `🌧 Steady rain expected — waterproof shoes or boots are a smart choice.`
    );
    tips.add(
      `☔ Carry an umbrella or wear a raincoat to avoid getting soaked.`
    );
  } else if (rain > 0) {
    tips.add(
      `🌦 Light showers possible — maybe grab a foldable umbrella just in case.`
    );
  } else if (conditionText.includes("rain")) {
    tips.add(`🌧 Rainy skies — good day to keep plans flexible.`);
  }

  // 💨 Wind-related tips
  if (wind > 40) {
    tips.add(
      `💨 Very windy — avoid loose hats or light items that might fly away.`
    );
    tips.add(`🌬 Consider staying in sheltered areas if walking outside.`);
  } else if (wind > 25) {
    tips.add(`🍃 Breezy day — a windbreaker jacket could be helpful.`);
  }

  // 💦 Humidity-based notes
  if (humidity >= 85) {
    tips.add(
      `😓 The air is heavy with humidity — wear airy clothes and drink plenty of water.`
    );
    tips.add(
      `👟 Light fabrics like cotton can help reduce discomfort during a walk.`
    );
  } else if (humidity <= 30) {
    tips.add(
      `💧 Very dry air — stay hydrated and consider using lip balm or moisturizer.`
    );
  }

  // 🌤 Sun or cloud mood
  if (conditionText.includes("sunny")) {
    tips.add(
      `🕶 Bright and sunny — sunglasses and a cap can keep you comfortable outdoors.`
    );
  }
  if (conditionText.includes("cloud")) {
    tips.add(`☁ Cloudy skies — perfect weather for a calm outdoor stroll.`);
  }

  // 🧘‍♀️ One random lifestyle encouragement (50% chance)
  const lifestylePool = [
    `👣 Take a short walk today to refresh your mind — even 10 minutes helps.`,
    `🧘‍♀️ Breathe deeply and enjoy the outdoors — nature is therapy.`,
    `📸 If the skies are clear, it's a great day to take photos outside.`,
    `🎧 Put on your favorite playlist and enjoy a mindful walk.`,
    `📖 Consider reading a book outside to enjoy the fresh air.`,
    `💬 Call a friend and catch up while strolling — it's good for the soul.`,
    `🌳 Visit a nearby park or green space for a mental reset.`,
    `🏃‍♂️ A light jog in this weather can boost your mood and energy.`,
    `🧴 Always carry sunscreen in your bag — even on cloudy days.`,
    `🥤 Don't forget to drink water regularly while you're out.`,
    `🩴 Perfect weather to wear comfortable shoes and explore nearby places.`,
    `📅 Plan a short outdoor break during your work or study schedule.`,
    `🌅 Catch the sunrise or sunset — they're free and magical.`,
    `🐶 Take your pet for a walk — great for both of you!`,
    `🎒 Pack light and wear breathable clothes to stay comfy all day.`,
    `📵 Go offline for 30 minutes and reconnect with nature.`,
    `🌸 Notice the small things — flowers, birds, or even the sky.`,
    `🍃 A walk in fresh air is a great way to reset your thoughts.`,
    `🎨 Sketch, write, or reflect in a notebook while outdoors.`,
    `🧺 Take your meal or coffee break outside — even if it's just on a balcony.`,
  ];

  if (showTips && Math.random() < 0.5) {
    const randomTip =
      lifestylePool[Math.floor(Math.random() * lifestylePool.length)];
    tips.add(randomTip);
  }

  return Array.from(tips);
}
