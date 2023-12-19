#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define SS_PIN 15
#define RST_PIN 4
#define LED_DENY 45
#define LED_ACCESS 37
#define ACTIVE_BUZZER 13

const char* ssid = "PhoneQ";
const char* password = "13032002";

String server_name = "http://172.20.10.6/";

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance.

void checkSuccess() {
  Serial.println("Authorized access");
  Serial.println();
  digitalWrite(LED_ACCESS, HIGH);
  delay(3000);
  digitalWrite(LED_ACCESS, LOW);
}

void checkFail() {
  Serial.println("Access denied");
  digitalWrite(LED_DENY, HIGH);
  delay(3000);
  digitalWrite(LED_DENY, LOW);
}

void setup() {
  Serial.begin(115200);
  // set mode cho các chân
  pinMode(LED_DENY, OUTPUT);
  pinMode(LED_ACCESS, OUTPUT);
  pinMode(ACTIVE_BUZZER, OUTPUT);
  digitalWrite(ACTIVE_BUZZER, LOW);

  // kết nối wifi
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  // kết nối với module rfid
  SPI.begin(7, 5, 6, SS_PIN);
  mfrc522.PCD_Init();
  Serial.println("Approximate your card to the reader...");
  Serial.println();
}

void loop() {
  // Look for new cards
  if (!mfrc522.PICC_IsNewCardPresent()) {
    delay(500);
    return;
  }
  // Select one of the cards
  if (!mfrc522.PICC_ReadCardSerial()) {
    delay(500);
    return;
  }
  //Show UID on serial monitor
  Serial.print("UID tag :");
  String content = "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  Serial.print("Message : ");
  content.toUpperCase();
  
  digitalWrite(ACTIVE_BUZZER, HIGH);
  delay(100);
  digitalWrite(ACTIVE_BUZZER, LOW);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    String card_id = content.substring(1);
    std::replace(card_id.begin(), card_id.end(), ' ', '_');
    String urlRequest = server_name + "send-card-id/" + card_id;

    http.begin(urlRequest.c_str()); 

    // Send HTTP POST request
    int httpResponseCode = http.POST("");
    if (httpResponseCode >= 200 && httpResponseCode <= 204) {
      checkSuccess();
    } else {
      checkFail();
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
}