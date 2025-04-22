
<br />

### 🌐 배포 URL: https://product-listing-app-two.vercel.app

<br />

## 🛠️ 작업 내용

### 1. 상태 관리 및 동기화
- 검색어와 정렬 상태를 URL 쿼리 파라미터에 동기화하여 새로고침 후에도 상태 유지 (`useSearchParams`, `useRouter` 사용)
- 뷰 타입(Grid/List)은 페이지 최초 진입 시 랜덤으로 결정되며, 쿠키에 저장해 24시간 동안 유지되도록 Next.js 미들웨어로 처리

### 2. 무한 스크롤
- `IntersectionObserver`를 활용해 스크롤 하단에 도달하면 자동으로 다음 페이지 API 호출
- 검색 및 정렬 필터 결과에도 동일하게 무한 스크롤 적용

### 3. 컴포넌트 설계
- `SearchFilter`: 검색어 및 정렬 옵션 관리
- `ProductList`: 상품 목록 렌더링 및 무한 스크롤 트리거
- `ProductCard`: 개별 상품 정보 표시
- 모든 컴포넌트는 단일 책임 원칙을 기반으로 설계하여 재사용성과 유지보수성을 고려함

### 4. 코드 품질
- API 호출, 상태 로직, 스타일링을 기능 단위로 분리하여 모듈화
- 명확한 네이밍과 함수 분리로 가독성과 유지보수성 향상

### 5. UI/UX
- SCSS 모듈을 활용한 반응형 디자인 구현 (Grid/List View 모두 대응)
