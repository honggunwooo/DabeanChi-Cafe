module.exports = [
"[project]/frontend/app/bean/[id]/bean-detail.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backButton": "bean-detail-module__dPVjfW__backButton",
  "beanName": "bean-detail-module__dPVjfW__beanName",
  "buttonGroup": "bean-detail-module__dPVjfW__buttonGroup",
  "buyButton": "bean-detail-module__dPVjfW__buyButton",
  "cartButton": "bean-detail-module__dPVjfW__cartButton",
  "container": "bean-detail-module__dPVjfW__container",
  "description": "bean-detail-module__dPVjfW__description",
  "descriptionText": "bean-detail-module__dPVjfW__descriptionText",
  "descriptionTitle": "bean-detail-module__dPVjfW__descriptionTitle",
  "detailItem": "bean-detail-module__dPVjfW__detailItem",
  "detailLabel": "bean-detail-module__dPVjfW__detailLabel",
  "detailValue": "bean-detail-module__dPVjfW__detailValue",
  "detailWrapper": "bean-detail-module__dPVjfW__detailWrapper",
  "detailsGrid": "bean-detail-module__dPVjfW__detailsGrid",
  "favoriteButton": "bean-detail-module__dPVjfW__favoriteButton",
  "formTitle": "bean-detail-module__dPVjfW__formTitle",
  "header": "bean-detail-module__dPVjfW__header",
  "imageSection": "bean-detail-module__dPVjfW__imageSection",
  "infoSection": "bean-detail-module__dPVjfW__infoSection",
  "logo": "bean-detail-module__dPVjfW__logo",
  "mainImage": "bean-detail-module__dPVjfW__mainImage",
  "notFound": "bean-detail-module__dPVjfW__notFound",
  "price": "bean-detail-module__dPVjfW__price",
  "ratingInput": "bean-detail-module__dPVjfW__ratingInput",
  "ratingRow": "bean-detail-module__dPVjfW__ratingRow",
  "ratingSelect": "bean-detail-module__dPVjfW__ratingSelect",
  "reviewAuthor": "bean-detail-module__dPVjfW__reviewAuthor",
  "reviewComment": "bean-detail-module__dPVjfW__reviewComment",
  "reviewCount": "bean-detail-module__dPVjfW__reviewCount",
  "reviewDate": "bean-detail-module__dPVjfW__reviewDate",
  "reviewForm": "bean-detail-module__dPVjfW__reviewForm",
  "reviewHeader": "bean-detail-module__dPVjfW__reviewHeader",
  "reviewItem": "bean-detail-module__dPVjfW__reviewItem",
  "reviewList": "bean-detail-module__dPVjfW__reviewList",
  "reviewRating": "bean-detail-module__dPVjfW__reviewRating",
  "reviewSection": "bean-detail-module__dPVjfW__reviewSection",
  "reviewTextarea": "bean-detail-module__dPVjfW__reviewTextarea",
  "reviewTitle": "bean-detail-module__dPVjfW__reviewTitle",
  "stars": "bean-detail-module__dPVjfW__stars",
  "submitReview": "bean-detail-module__dPVjfW__submitReview",
  "titleRow": "bean-detail-module__dPVjfW__titleRow",
});
}),
"[project]/frontend/app/bean/[id]/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BeanDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/frontend/app/bean/[id]/bean-detail.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
function BeanDetail() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const [bean, setBean] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newReview, setNewReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        rating: 5,
        comment: ""
    });
    const [isFavorite, setIsFavorite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const beans = JSON.parse(localStorage.getItem("beans") || "[]");
        const foundBean = beans.find((b)=>b.id === Number.parseInt(params.id));
        setBean(foundBean);
        const storedReviews = JSON.parse(localStorage.getItem(`reviews_${params.id}`) || "[]");
        setReviews(storedReviews);
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(favorites.includes(Number.parseInt(params.id)));
    }, [
        params.id
    ]);
    const toggleFavorite = ()=>{
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const newFavorites = isFavorite ? favorites.filter((id)=>id !== Number.parseInt(params.id)) : [
            ...favorites,
            Number.parseInt(params.id)
        ];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };
    const addToCart = ()=>{
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(bean);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("장바구니에 추가되었습니다!");
    };
    const submitReview = (e)=>{
        e.preventDefault();
        const review = {
            id: Date.now(),
            ...newReview,
            date: new Date().toISOString(),
            author: "사용자"
        };
        const updatedReviews = [
            review,
            ...reviews
        ];
        setReviews(updatedReviews);
        localStorage.setItem(`reviews_${params.id}`, JSON.stringify(updatedReviews));
        setNewReview({
            rating: 5,
            comment: ""
        });
    };
    if (!bean) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].notFound,
                children: "원두를 찾을 수 없습니다."
            }, void 0, false, {
                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/app/bean/[id]/page.jsx",
            lineNumber: 59,
            columnNumber: 7
        }, this);
    }
    const averageRating = reviews.length > 0 ? (reviews.reduce((sum, r)=>sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logo,
                        children: "DabeanChi"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backButton,
                        children: "← 목록으로"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailWrapper,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageSection,
                        children: bean.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: bean.image || "/placeholder.svg",
                            alt: bean.beanName,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainImage
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].infoSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].titleRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].beanName,
                                        children: bean.beanName
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].favoriteButton,
                                        onClick: toggleFavorite,
                                        children: isFavorite ? "❤️" : "🤍"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ratingRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stars,
                                        children: [
                                            "⭐ ",
                                            averageRating
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewCount,
                                        children: [
                                            "(",
                                            reviews.length,
                                            "개 리뷰)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].price,
                                children: [
                                    Number.parseInt(bean.price).toLocaleString(),
                                    "원"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailsGrid,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailLabel,
                                                children: "원산지"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 103,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailValue,
                                                children: bean.origin
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailLabel,
                                                children: "로스팅"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 107,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailValue,
                                                children: bean.roastLevel === "light" ? "라이트 로스트" : bean.roastLevel === "medium" ? "미디엄 로스트" : "다크 로스트"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 108,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailLabel,
                                                children: "중량"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 117,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailValue,
                                                children: bean.weight
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 118,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    bean.region && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailLabel,
                                                children: "재배 지역"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailValue,
                                                children: bean.region
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    bean.breed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailLabel,
                                                children: "품종"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailValue,
                                                children: bean.breed === 'Typica' ? '티피카' : bean.breed === 'Bourbon' ? '버번' : bean.breed === 'Geisha' ? '게이샤' : bean.breed === 'Pacamara' ? '파카마라' : bean.breed === 'Catuai' ? '카투아이' : bean.breed
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this),
                                    bean.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailLabel,
                                                children: "거래 지역"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailValue,
                                                children: [
                                                    "📍 ",
                                                    bean.location
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 141,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].description,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].descriptionTitle,
                                        children: "상세 설명"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].descriptionText,
                                        children: bean.description
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buttonGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartButton,
                                        onClick: addToCart,
                                        children: "장바구니 담기"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buyButton,
                                        children: "바로 구매"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewTitle,
                        children: [
                            "리뷰 (",
                            reviews.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewForm,
                        onSubmit: submitReview,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formTitle,
                                children: "리뷰 작성하기"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ratingInput,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "평점:"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: newReview.rating,
                                        onChange: (e)=>setNewReview({
                                                ...newReview,
                                                rating: Number.parseInt(e.target.value)
                                            }),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ratingSelect,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "5",
                                                children: "⭐⭐⭐⭐⭐ (5점)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "4",
                                                children: "⭐⭐⭐⭐ (4점)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 173,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "3",
                                                children: "⭐⭐⭐ (3점)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 174,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "2",
                                                children: "⭐⭐ (2점)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 175,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "1",
                                                children: "⭐ (1점)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 176,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewTextarea,
                                placeholder: "이 원두에 대한 솔직한 리뷰를 남겨주세요...",
                                value: newReview.comment,
                                onChange: (e)=>setNewReview({
                                        ...newReview,
                                        comment: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].submitReview,
                                children: "리뷰 등록"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewList,
                        children: reviews.map((review)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewAuthor,
                                                children: review.author
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewRating,
                                                children: "⭐".repeat(review.rating)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                                lineNumber: 196,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewComment,
                                        children: review.comment
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$bean$2f5b$id$5d2f$bean$2d$detail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reviewDate,
                                        children: new Date(review.date).toLocaleDateString()
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, review.id, true, {
                                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/bean/[id]/page.jsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/bean/[id]/page.jsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=frontend_deb00759._.js.map