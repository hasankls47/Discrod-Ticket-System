# Discord Destek Sistemi: Kullanım Kılavuzu

Bu Discord botu, sunucunuz için gelişmiş ve kullanıcı dostu bir destek sistemi sunar. Kullanıcıların kolayca destek talebi oluşturmasını ve yöneticilerin bu talepleri verimli bir şekilde yönetmesini sağlar.

---

## 🇹🇷 Türkçe Anlatım

### 1. Yardım Komutları (Help Commands)

Botun temel komutlarını ve mevcut bilet sistemi seçeneklerini görmek için aşağıdaki komutları kullanabilirsiniz:

* **Prefix Komutları:**
    * `.help`: Genel yardım menüsünü gösterir.
    * `.button-system`: Buton bazlı bilet sistemi kurulumu ve kullanımı hakkında bilgi verir.
    * `.modal-system`: Modal (açılır pencere) bazlı bilet sistemi kurulumu ve kullanımı hakkında bilgi verir.
    * `.select-system`: Seçim menüsü bazlı bilet sistemi kurulumu ve kullanımı hakkında bilgi verir.
* **Slash Komutları:**
    * `/help`: Genel yardım menüsünü gösterir.
    * `/talep-sayi`: Toplam talep sayısını gösterir.

### 2. Destek Talebi Oluşturma (Creating a Support Ticket)

Destek kanalı, kullanıcıların yardım alabileceği ve sorularını sorabileceği ana yerdir. Destek talebi oluşturmak için ana yöntemler bulunur:

* **Buton ile Talep Oluşturma:** Destek kanalında bulunan "Destek Talebi Oluştur" butonuna tıklayarak hızlıca bir bilet açabilirsiniz.
    * **NOT:** Gereksiz destek talebi açmak ceza almanıza neden olabilir.
* **Seçim Menüsü ile Talep Oluşturma:** "Açmak istediğin talep sebebini seç." başlığı altındaki açılır menüden sorununuzla ilgili bir kategori seçerek bilet açabilirsiniz.
* **Modal (Açılır Pencere) ile Talep Oluşturma:** Bir bilet açmak istediğinizde, "Destek Talebi" başlıklı bir açılır pencere (modal) belirir. Bu pencerede "Sebep?" kısmına bilet açma sebebinizi yazarak talebinizi oluşturabilirsiniz.
    * **Önemli Uyarı:** Bu form Klshasan47 uygulamasına gönderilecektir. Şifrelerinizi ya da diğer hassas bilgilerinizi paylaşmadığınızdan emin olun.

### 3. Destek Sistemi Kurulumu ve Yönetimi (Setting Up and Managing the Support System)

Bot, yöneticilerin bilet sistemini özelleştirmesi için kapsamlı ayarlar sunar:

* **Destek Kategorisi:** Yeni oluşturulan destek kanallarının hangi kategoride yer alacağını seçebilirsiniz (örneğin, `#New System`).
* **Destek Kanalı:** Biletlerin oluşturulacağı ana destek kanalını seçebilirsiniz (örneğin, `#modal-destek`).
* **Destek Yetkili Rolü:** Destek taleplerini yönetebilecek yetkili rolünü belirleyebilirsiniz (örneğin, `@Root`).
* **Destek Log Kanalı:** Açılan ve kapatılan biletlerin loglarının gönderileceği kanalı seçebilirsiniz (örneğin, `#buton-log`).
* **Ayarları Uygula/Mesaj Gönder:** Tüm ayarları yaptıktan sonra sistemi aktif etmek veya ilgili mesajı göndermek için butonu kullanabilirsiniz.
* **Sistemi Sıfırla:** Tüm bilet sistemi ayarlarını sıfırlamak için bu seçeneği kullanabilirsiniz.
* **Mesajı Sil:** Botun gönderdiği sistem mesajlarını silmek için bu butonu kullanabilirsiniz.

### 4. Açılan Destek Talepleri (Open Support Tickets)

Bir destek talebi açıldığında, aşağıdaki bilgilerle birlikte bir bilet mesajı oluşturulur:

* **Kullanıcı:** Bileti açan kullanıcının adı ve ID'si.
* **Açılış Zamanı:** Biletin açıldığı tarih ve saat (örneğin, 18 Haziran 2025 12:35).
* **Kapanış Zamanı:** Biletin kapatıldığı tarih ve saat (genellikle kapatıldığında güncellenir).
* **Sebep:** Kullanıcı tarafından belirtilen biletin sebebi (eğer belirtilmemişse "Bilinmiyor").
* **Toplam Talep Sayısı:** Sistem genelinde açılan toplam bilet sayısı.

---

## 🇬🇧 English Explanation

### 1. Help Commands

To view the bot's basic commands and available ticket system options, you can use the following commands:

* **Prefix Commands:**
    * `.help`: Displays the general help menu.
    * `.button-system`: Provides information about setting up and using the button-based ticket system.
    * `.modal-system`: Provides information about setting up and using the modal-based ticket system.
    * `.select-system`: Provides information about setting up and using the select menu-based ticket system.
* **Slash Commands:**
    * `/help`: Displays the general help menu.
    * `/talep-sayi`: Shows the total number of tickets.
    * `/avatar`: Displays a user's avatar.
    * `/banner`: Displays a user's banner.

### 2. Creating a Support Ticket

The support channel is the main place where users can get help and ask questions. There are primary methods to create a support ticket:

* **Creating a Ticket via Button:** You can quickly open a ticket by clicking the "Destek Talebi Oluştur" (Create Support Ticket) button in the support channel.
    * **NOTE:** Opening unnecessary support tickets may result in penalties.
* **Creating a Ticket via Select Menu:** You can open a ticket by selecting a category related to your issue from the dropdown menu under the heading "Açmak istediğin talep sebebini seç." (Select the reason for the request you want to open).
* **Creating a Ticket via Modal Pop-up:** When you wish to open a ticket, a pop-up window (modal) titled "Destek Talebi" (Support Request) will appear. In this window, you can create your request by typing the reason for opening the ticket in the "Sebep?" (Reason?) field.
    * **Important Warning:** This form will be sent to the Klshasan47 application. Please ensure you do not share your passwords or other sensitive information.

### 3. Setting Up and Managing the Support System

The bot offers comprehensive settings for administrators to customize the ticket system:

* **Support Category:** You can select the category where newly created support channels will be placed (e.g., `#New System`).
* **Support Channel:** You can select the main support channel where tickets will be created (e.g., `#modal-destek`).
* **Support Staff Role:** You can designate the authorized role that can manage support tickets (e.g., `@Root`).
* **Support Log Channel:** You can select the channel where logs of opened and closed tickets will be sent (e.g., `#buton-log`).
* **Apply Settings/Send Message:** After making all settings, you can use the button to activate the system or send the relevant message.
* **Reset System:** You can use this option to reset all ticket system settings.
* **Delete Message:** You can use this button to delete system messages sent by the bot.

### 4. Open Support Tickets

When a support ticket is opened, a ticket message is generated with the following information:

* **User:** The name and ID of the user who opened the ticket.
* **Opening Time:** The date and time the ticket was opened (e.g., June 18, 2025, 12:35).
* **Closing Time:** The date and time the ticket was closed (usually updated upon closure).
* **Reason:** The reason for the ticket as stated by the user (if not specified, "Unknown").
* **Total Ticket Count:** The total number of tickets opened across the system.
