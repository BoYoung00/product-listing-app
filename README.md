
# Product Listing App

<br />

### 🌐 배포 URL: https://product-listing-app-two.vercel.app

<br />

## ⚙️ 기술 스택

- **React 18**, **Next.js 15 (App Router)**
- **TypeScript**
- **SCSS Modules**
- **ESLint / Prettier**
- **Vercel**
<br />

## 🚀 주요 기능 및 구현 내용

### 1. 서버 사이드 렌더링 (SSR) 및 초기 API 데이터 호출
- 초기 데이터는 SSR로 렌더링하고, 나머지는 CSR로 처리해 SEO와 UX를 함께 최적화

### 2. 상태 관리 및 URL 동기화
- 검색어와 정렬 상태를 **URL 쿼리 파라미터**에 동기화 (`useSearchParams`, `useRouter` 활용)
- 페이지 새로고침 및 링크 공유 시에도 필터 상태가 유지됨

### 3. 랜덤 뷰 타입 설정 및 유지
- 페이지 최초 진입 시 **Grid / List 뷰 타입을 랜덤으로 설정**
- 설정된 뷰 타입은 쿠키에 저장되어 **24시간 동안 유지**
- **Next.js 미들웨어**를 사용하여 서버 측에서 쿠키 제어

### 4. 무한 스크롤 구현
- `IntersectionObserver` API를 활용하여 페이지 하단 도달 시 다음 상품 자동 로딩
- 필터 조건이 바뀌어도 동일한 방식으로 무한 스크롤 작동
- 더 이상 불러올 데이터가 없을 경우 사용자에게 안내 메시지 표시

### 5. 컴포넌트 구조 및 단일 책임 원칙
- 모든 컴포넌트는 단일 책임 원칙(SRP)을 기반으로 설계
- 주요 컴포넌트
  - `SearchFilter`: 검색/정렬 필터 UI 및 상태 관리
  - `ProductList`: 리스트 렌더링 및 무한 스크롤 트리거
  - `ProductCard`: 개별 상품 정보 표시

### 6. 코드 품질 및 스타일링
- 기능 단위로 폴더 분리 (`features`, `components`, `utils`, `api` 등)
- SCSS Modules를 활용해 **반응형 레이아웃** 지원 (Grid/List 모두 대응)
- ESLint와 Prettier 설정을 통한 **일관된 코드 스타일** 유지
