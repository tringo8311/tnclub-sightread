---
name: GitHub Pages Deployment Fixer
description: Hướng dẫn cấu hình, kiểm tra và sửa tất cả các lỗi thường gặp khi publish ứng dụng Vite/React Router/SPA lên GitHub Pages.
---

# GitHub Pages Deployment & Troubleshooting Playbook

Tài liệu hướng dẫn khắc phục và quy trình chuẩn (Playbook) để cấu hình, kiểm tra, sửa lỗi khi publish ứng dụng Web (Vite, React Router, SPA) lên GitHub Pages.

---

## 1. Các Lỗi Thường Gặp & Cách Khắc Phục (Troubleshooting)

### 🚨 Lỗi 1: 404 Not Found cho CSS, JS, Favicon, Hình ảnh (Sai `base` URL)
* **Triệu chứng:** Trang web trắng xóa, console báo lỗi 404 không tải được các file assets (`.js`, `.css`, `.png`).
* **Nguyên nhân:** Đường dẫn asset mặc định là tuyệt đối (`/assets/...`), nhưng trên GitHub Pages ứng dụng nằm trong subpath repo (ví dụ: `https://username.github.io/repo-name/`).
* **Cách khắc phục:**
  1. **Cấu hình `vite.config.ts`:**
     ```ts
     export default defineConfig({
       base: process.env.GITHUB_PAGES === 'true' ? '/repo-name/' : '/',
       // ...
     })
     ```
  2. **Truy cập Asset trong Code:**
     Không hardcode `/images/icon.png`, luôn sử dụng `import.meta.env.BASE_URL`:
     ```tsx
     <img src={`${import.meta.env.BASE_URL}images/icon.png`} alt="Logo" />
     ```

---

### 🚨 Lỗi 2: 404 khi Refresh hoặc Truy Cập Trực Tiếp Đích (/songs, /theory)
* **Triệu chứng:** Bấm link trong app chuyển trang bình thường, nhưng nhấn F5/Refresh hoặc paste đường dẫn trực tiếp thì GitHub Pages báo `404 File Not Found`.
* **Nguyên nhân:** GitHub Pages là máy chủ tĩnh (static host), không có chế độ rewrite URL cho Client-side Routing (Single Page Application).
* **Cách khắc phục:**
  - **Cách A (Khuyên dùng - `404.html` redirect trick):**
    Tạo file `public/404.html` hoặc tự động sao chép từ `index.html` khi build:
    ```bash
    cp build/client/index.html build/client/404.html
    ```
  - **Cách B (Hash Router):**
    Nếu không muốn dùng `404.html`, chuyển sang dùng `createHashRouter` thay cho `createBrowserRouter`.

---

### 🚨 Lỗi 3: File có thư mục bắt đầu bằng dấu gạch dưới `_` bị biến mất (`.nojekyll`)
* **Triệu chứng:** Tải thiếu các file CSS/JS hoặc tài nguyên đặt trong thư mục kiểu `_assets` hoặc `_next`.
* **Nguyên nhân:** Mặc định GitHub Pages chạy Jekyll builder và bỏ qua tất cả file/folder bắt đầu bằng `_` hoặc `.`.
* **Cách khắc phục:**
  Tạo file rỗng `.nojekyll` trong thư mục đầu ra khi build:
  ```bash
  touch build/client/.nojekyll
  ```

---

### 🚨 Lỗi 4: GitHub Actions Workflow Báo Lỗi Permission / 403 Forbidden
* **Triệu chứng:** Action build thành công nhưng step `actions/deploy-pages` thất bại báo lỗi thiếu quyền.
* **Nguyên nhân:** Workflow YAML thiếu khai báo `permissions` cho ID Token & Pages.
* **Cách khắc phục:**
  Khai báo quyền trong file `.github/workflows/deploy.yml`:
  ```yaml
  permissions:
    contents: read
    pages: write
    id-token: write
  ```
  Đồng thời vào **Settings -> Pages** trên GitHub repository, chọn **Source: GitHub Actions**.

---

### 🚨 Lỗi 5: React 19 Runtime Error `nextResource.createElementNS is not a function`
* **Triệu chứng:** Lỗi runtime khi render thẻ `<link>` hoặc `<script>` động trong component khi dùng React 19 với React Router 7.
* **Nguyên nhân:** Cấu hình SSR/Prerender cố gắng hoisting tài nguyên nhưng context root document trên server/hydration không tương thích.
* **Cách khắc phục:**
  Tải tài nguyên động (như Google Fonts hay stylesheet) hoàn toàn ở phía client trong `useEffect` (`typeof window !== 'undefined'`), không trả về thẻ `<link>` trực tiếp từ JSX output trong `body`.

---

## 2. Quy Trình Kiểm Tra Chuẩn (Deployment Checklist)

Trước khi push hoặc trigger deployment, luôn thực hiện các bước sau tại local:

```bash
# 1. Kiểm tra Lỗi Kiểu Dữ Liệu
npm run check-types

# 2. Kiểm tra Build Production tại Local
npm run build

# 3. Đảm bảo file .nojekyll và 404.html có trong thư mục đầu ra
cp build/client/index.html build/client/404.html
touch build/client/.nojekyll
```

---

## 3. Mẫu File Workflow `.github/workflows/deploy.yml` Chuẩn

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Application
        env:
          GITHUB_PAGES: 'true'
        run: |
          npm run check-types
          npm run build
          cp build/client/index.html build/client/404.html
          touch build/client/.nojekyll

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'build/client'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
