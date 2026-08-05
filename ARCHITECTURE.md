# Kiến Trúc Ứng Dụng (Architecture)

Tài liệu này cung cấp cái nhìn tổng quan về cách ứng dụng **Sightread** hoạt động, các công nghệ được sử dụng và luồng dữ liệu chính của hệ thống.

## 1. Mục đích của ứng dụng
**Sightread** là một ứng dụng web hướng tới việc giúp người dùng học chơi piano mà không cần phải biết đọc bản nhạc (sheet music) truyền thống. Thay vào đó, nó sử dụng các cách trực quan hóa (như các thanh nốt nhạc rơi xuống giống game Synthesia). Trải nghiệm tốt nhất của ứng dụng là khi bạn cắm trực tiếp đàn Piano điện / MIDI keyboard vào máy tính.

## 2. Công nghệ sử dụng (Tech Stack)
* **Framework:** Ứng dụng được xây dựng bằng **React** kết hợp với **React Router v7** và dùng **Vite** làm công cụ đóng gói (bundler).
* **Giao diện (UI):** Sử dụng **Tailwind CSS v4** để styling, kết hợp với các component không giao diện (headless) từ **Radix UI** và **React Aria** để đảm bảo khả năng truy cập (accessibility).
* **Quản lý trạng thái (State Management):** Sử dụng **Jotai** (một thư viện quản lý state dựa trên atom, rất phù hợp cho các ứng dụng có nhiều tương tác phức tạp nhưng cần tối ưu render).
* **Ngôn ngữ:** TypeScript.

## 3. Cấu trúc các tính năng cốt lõi (`src/features`)
Hầu hết các logic nghiệp vụ và tính năng cốt lõi của ứng dụng được đặt trong thư mục `src/features`:

* **`midi` & `@tonejs/midi` (Xử lý MIDI):** Ứng dụng sử dụng Web MIDI API để lắng nghe tín hiệu trực tiếp từ đàn piano/keyboard của bạn. Khi bạn bấm một phím trên đàn thật, tín hiệu MIDI sẽ được gửi lên web để ứng dụng biết bạn đánh đúng hay sai nốt. Các thư viện như `@tonejs/midi` hỗ trợ việc đọc và phân tích dữ liệu các file bài nhạc định dạng `.mid`.
* **`drawing` & `SongVisualization` (Trực quan hóa đồ họa):** Thay vì sheet nhạc truyền thống, hệ thống dùng Canvas hoặc các thành phần đồ họa trên trình duyệt để vẽ màn hình chơi nhạc, mô phỏng phím đàn piano và các nốt nhạc rơi xuống tương tác với thời gian thực.
* **`audio` & `synth` (Tổng hợp âm thanh):** Ứng dụng có thể tự phát ra âm thanh piano (synthesizer) trực tiếp trên trình duyệt khi bạn tương tác trên bàn phím ảo hoặc khi nó phát mẫu bài nhạc.
* **`player` & `controls` (Trình điều khiển chơi nhạc):** Cung cấp các công cụ như một máy nghe nhạc thực thụ (phát, tạm dừng, tua lại) và có các luồng xử lý để theo dõi tiến độ của bài nhạc, khớp nhịp điệu logic với phần hiển thị đồ họa.
* **`theory` & `parsers` (Lý thuyết âm nhạc & Phân tích):** Chứa logic để phân tích thông số của bản nhạc (nhịp độ, cao độ, hợp âm, trường độ nốt), từ đó đối chiếu với những gì bạn đánh trên đàn xem có khớp không.

## 4. Luồng hoạt động (Workflow)
1. **Nạp dữ liệu:** Người dùng chọn một bài hát (thường là file MIDI đã được nạp sẵn hoặc tải lên).
2. **Phân tích (Parse):** Các module `parsers` và `theory` sẽ phân tích bài nhạc để trích xuất các luồng dữ liệu nốt nhạc và nhịp độ.
3. **Phát nhạc & Trực quan (Play & Visualize):** Trình `player` bắt đầu đếm nhịp độ và gửi tín hiệu cho module `SongVisualization` để vẽ đồ họa các nốt chạy xuống trên màn hình một cách đồng bộ.
4. **Tương tác MIDI:** Thông qua module `midi`, trình duyệt kết nối với đàn Piano thật của người dùng. Khi nốt rơi xuống đích, người dùng bấm phím đàn.
5. **Đánh giá (Feedback):** Tín hiệu từ đàn truyền ngược lên hệ thống, ứng dụng kiểm tra độ chính xác (đúng nốt, đúng nhịp) và hiển thị phản hồi đồ họa tương ứng ngay lập tức.
