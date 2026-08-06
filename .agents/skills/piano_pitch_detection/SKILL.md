---
name: Piano Pitch Detection
description: Hướng dẫn cấu hình, thuật toán và xử lý tín hiệu (chống giật nốt) khi nhận diện cao độ tiếng đàn Piano qua Microphone.
---

# Piano Pitch Detection Best Practices

Khi làm việc với các module nhận diện âm thanh và cao độ của Piano (ví dụ như `useMicrophonePitch.ts`), cần tuân thủ các nguyên tắc sau để hệ thống hoạt động ổn định và chính xác nhất, tránh các lỗi nhận diện cơ bản:

## 1. Lựa chọn thuật toán (Pitch Detection Algorithm)
- **Sử dụng thuật toán Macleod (MPM)** của `pitchfinder` thay vì thuật toán YIN.
- **Lý do**: YIN hoạt động rất tốt đối với âm thanh đơn âm (pure tones) hoặc giọng người, nhưng Piano là một nhạc cụ có rất nhiều họa âm (harmonics) và dải tấn công âm thanh (attack transients) rất sắc. Thuật toán MPM ổn định và chống sai lệch quãng tám (octave errors) tốt hơn nhiều đối với tiếng đàn.
- **Code mẫu**: `Macleod({ sampleRate: audioContext.sampleRate, bufferSize: analyser.fftSize, cutoff: 0.9 })`

## 2. Kích thước bộ đệm (FFT Size)
- Cài đặt **`analyser.fftSize = 4096`** (hoặc lớn hơn nếu cần) thay vì 2048.
- **Lý do**: Các nốt trầm của Piano có tần số rất thấp (khoảng 32Hz cho nốt C1). Để phân tích được cao độ chính xác, sample window cần chứa ít nhất 2 chu kỳ sóng âm. Ở tần số 44100Hz, kích thước 2048 là quá bé và sẽ bỏ lỡ các nốt trầm của đàn.

## 3. Lọc tín hiệu nhiễu
- Sử dụng kết hợp mức âm lượng (RMS) và độ tin cậy (Probability).
- Thuật toán MPM trả về cả biến `probability`. Chỉ nên chấp nhận kết quả nhận diện nếu **`probability > 0.8`** và RMS vượt qua một ngưỡng tĩnh (ví dụ: `rms > 0.002`). Điều này giúp loại bỏ tiếng ồn môi trường làm nhiễu tín hiệu.

## 4. Chống hiện tượng "giật cục nốt" (Grace Period / Debounce Release)
- Khi phím đàn ngân dài (sustain), năng lượng sóng âm giảm dần theo thời gian. Sự dao động này có thể làm tín hiệu rớt ngưỡng hoặc rớt probability trong khoảnh khắc (1 vài frame), khiến giá trị nhận diện trả về `null`.
- **TUYỆT ĐỐI KHÔNG** release nốt (nhả phím) ngay lập tức khi phát hiện tín hiệu `null`. Hành động này sẽ làm nốt bị bấm/nhả liên tục (re-triggering stutter).
- **Giải pháp**: Xây dựng một biến đếm (ví dụ `nullFrames`). Cho phép hệ thống giữ nguyên nốt cũ nếu khoảng thời gian rớt tín hiệu ngắn hơn ~150 mili-giây (tương đương 9 - 10 frames ở mức 60 FPS). Chỉ ngắt nốt khi vượt quá khoảng grace period này.
