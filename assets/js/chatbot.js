// (async () => {
//   var me = document.currentScript;
//   var id = me.getAttribute('id');
//   var token = me.getAttribute('bot');
//   var src = me.getAttribute('src');
//   var url_env = src.replace('/dist_files/databot.js', '');

//   function setChabot() {
//     var clientPathName = window.location.pathname;
//     var clientHostName = window.location.hostname;
//     var t = document.createElement('div');
//     t.id = 'message_box_id';
//     t.style.position = 'fixed';
//     t.style.zIndex = '2147483646';
//     let listOfCookies;
//     window.addEventListener('load', function (event) {
//       listOfCookies = document.cookie.split(';');
//     });
//     window.addEventListener('message', (e) => {
//       if (e.data === 'expand') {
//         t.firstChild.classList.remove('compact');
//         t.firstChild.classList.remove('menu-xl');
//         t.firstChild.classList.add('expand');
//       } else if (e.data === 'compact') {
//         t.firstChild.classList.remove('expand');
//         t.firstChild.classList.remove('menu-xl');
//         t.firstChild.classList.add('compact');
//       }
//       // recomendador xl
//       if (e.data === 'menu-xl') {
//         t.firstChild.classList.remove('expand');
//         t.firstChild.classList.add('menu-xl');
//       } else if (e.data === 'compact') {
//         t.firstChild.classList.remove('menu-xl');
//         t.firstChild.classList.add('compact');
//       }

//       if (e.data === 'expandWsp') {
//         t.lastChild.classList.remove('compact');
//         t.lastChild.classList.add('expand');
//       } else if (e.data === 'compactWsp') {
//         t.lastChild.classList.remove('expand');
//         t.lastChild.classList.add('compact');
//       }
//       if (e.data.event === 'show_chat') {
//         document.getElementById('chat_box_identifier').style.display = '';
//       }
//       if (e.data.event === 'show_widget') {
//         console.log('ðŸš€ Aqui *** -> show_widget');
//         const chatBox = document.getElementById('message_box_id');
//         const iframe = document.createElement('iframe');
//         iframe.id = 'whatsapp_box_identifier';
//         iframe.className = 'compact';
//         iframe.src = `${url_env}/whatsapp?id=${id}&token=${token}`;
//         chatBox.appendChild(iframe);
//       }
//       if (e.data.event === 'chatbot_ready') {
//         const databotIframe = document.getElementById('chat_box_identifier');
//         const urlSearchParams = new URLSearchParams(window.location.search);
//         const params = Object.fromEntries(urlSearchParams.entries());
//         databotIframe.contentWindow.postMessage(
//           { event: 'chatbot_ready', payload: { queryparams: params } },
//           url_env,
//         );
//       }
//       if (e.data.event === 'vtex_orderFormId') {
//         let tries = 0;

//         const getOrderFormNetwork = async () => {
//           const body = {
//             expectedOrderFormSections: [
//               'items',
//               'paymentData',
//               'totalizers',
//               'shippingData',
//               'sellers',
//             ],
//           };
//           const response = await fetch(
//             `${e.data.payload.vtexDomain}/api/checkout/pub/orderForm?refreshOutdatedData=true`,
//             {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 accept: 'application/json',
//                 Authority: e.data.payload.vtexDomain,
//               },
//               body: JSON.stringify(body),
//             },
//           );
//           const data = await response.json();
//           return data.orderFormId;
//         };

//         const interval = setInterval(async () => {
//           tries++;

//           let orderForm = JSON.parse(localStorage.getItem('orderform'));
//           if (!orderForm || orderForm.id === 'default-order-form') {
//             orderForm = await getOrderFormNetwork();
//           }

//           if (
//             (orderForm && orderForm.id !== 'default-order-form') ||
//             tries === 3
//           ) {
//             const databotIframe = document.getElementById(
//               'chat_box_identifier',
//             );
//             databotIframe.contentWindow.postMessage(
//               {
//                 event: 'vtex_orderFormId',
//                 payload: {
//                   orderFormId:
//                     orderForm?.id ||
//                     orderForm?.orderFormId ||
//                     orderForm ||
//                     null,
//                 },
//               },
//               url_env,
//             );
//             clearInterval(interval);
//           }
//         }, 3000);
//       }
//       if (e.data.event === 'woocommerce_nonce') {
//         console.log('NONCE WOO', e.data.payload.nonce);
//         const postCart = () => {
//           fetch(
//             `${e.data.payload.wdomain}/wp-json/wc/store/v1/cart/add-item?id=${e.data.payload.id}&quantity=${e.data.payload.quantity}`,
//             {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Nonce: e.data.payload.nonce,
//               },
//             },
//           )
//             .then((res) => {
//               console.log('Agregado al Carrito Woocommerce', res);
//               quantityCartWoo(e.data.payload.wdomain);
//             })
//             .catch((error) => {
//               console.log('Response Error:', error);
//             });
//         };
//         const getCart = async () => {
//           const res = await fetch(
//             `${e.data.payload.wdomain}/wp-json/wc/store/v1/cart/items`,
//           );
//           let cart = await res.json();
//           try {
//             if (cart.length > 0) {
//               const findID = cart.find(
//                 (element) => element.id == e.data.payload.id,
//               );
//               if (!findID) {
//                 postCart();
//               } else {
//                 fetch(
//                   `${e.data.payload.wdomain}/wp-json/wc/store/v1/cart/update-item?key=${findID.key}&quantity=${e.data.payload.quantity}`,
//                   {
//                     method: 'POST',
//                     headers: {
//                       'Content-Type': 'application/json',
//                       Nonce: e.data.payload.nonce,
//                     },
//                   },
//                 )
//                   .then((res) => {
//                     res;
//                     console.log('Carrito Actualizado Woocommerce ', res);
//                     quantityCartWoo(e.data.payload.wdomain);
//                   })
//                   .catch((error) => {
//                     console.log('Response Error:', error);
//                   });
//               }
//             } else {
//               postCart();
//             }
//           } catch (error) {
//             console.log('error global', error);
//           }
//         };
//         getCart();
//       }
//       if (e.data.event === 'shopify_cart') {
//         const productVariantId = e.data.payload.id_variant;
//         const quantityProduct = e.data.payload.quantity;
//         const postCartShopify = async () => {
//           let formData = {
//             items: [
//               {
//                 id: productVariantId,
//                 quantity: quantityProduct,
//               },
//             ],
//           };
//           await fetch('/cart/add.js', {
//             method: 'POST',
//             body: JSON.stringify(formData),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           })
//             .then((response) => {
//               return response.json();
//             })
//             .then((res) => {
//               console.log('Producto Agregado al carrito Shopify =>>>>', res);
//               quantityCartShop();
//             })
//             .catch((err) => console.error(err));
//         };
//         const getCartShopify = async () => {
//           const request = await fetch('/cart.js', {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//           let response = await request.json();
//           let cartShopify = await response.items;
//           console.log('items traer', cartShopify);
//           try {
//             if (cartShopify.length > 0) {
//               const findIDCart = cartShopify.find(
//                 (element) => element.variant_id == productVariantId,
//               );
//               if (!findIDCart) {
//                 postCartShopify();
//               } else {
//                 let formDataUpdate = {
//                   updates: {
//                     [productVariantId]: quantityProduct, //PRODUCT VARIANT : QUANTITY
//                   },
//                 };
//                 fetch('/cart/update.js', {
//                   method: 'POST',
//                   body: JSON.stringify(formDataUpdate),
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                 })
//                   .then((response) => {
//                     return response.json();
//                   })
//                   .then((res) => {
//                     console.log('Producto Actualizado Shopify =>>>>', res);
//                     quantityCartShop();
//                   })
//                   .catch((err) => {
//                     console.error(err);
//                   });
//               }
//             } else {
//               postCartShopify();
//             }
//           } catch (error) {
//             console.log('Error Carrito Shopify', error);
//           }
//         };
//         getCartShopify();
//       }
//       if (e.data.event === 'bsale_add_cart') {
//         const { bdomain: domain, productId, quantity, token } = e.data.payload;
//         // OBTIENE EL CARRO DE LA SESION
//         const postCart = async () => {
//           fetch(`${domain}/cart/create/${productId}?q=${quantity}`, {
//             method: 'GET',
//             headers: {
//               access_token: token,
//             },
//           })
//             .then((res) => res.json())
//             .then((data) => console.log('postCart data', data))
//             .catch((error) => console.error(error));
//         };
//         const putCart = async (cardDetailId) => {
//           fetch(`${domain}/cart/update_detail/${cardDetailId}?q=${quantity}`, {
//             method: 'GET',
//             headers: {
//               access_token: token,
//             },
//           })
//             .then((res) => res.json())
//             .then((data) => console.log('putCart data', data))
//             .catch((error) => console.error(error));
//         };
//         const cartEvent = async () => {
//           fetch(`${domain}/gateway/cart/dynamic?expand=cartDetails`, {
//             method: 'GET',
//             headers: {
//               access_token: token,
//             },
//           })
//             .then((res) => res.json())
//             .then((data) => {
//               console.log('data', data.data);
//               const cartDetails = data.data.cartDetails;
//               const cartDetailsIndex = cartDetails.findIndex(
//                 (e) =>
//                   e.idVarianteProducto === Number(productId) &&
//                   e.id_variante_producto === Number(productId),
//               );
//               if (cartDetailsIndex >= 0) {
//                 console.log('put');
//                 putCart(cartDetails[cartDetailsIndex].id);
//               } else {
//                 console.log('post');
//                 postCart();
//               }
//             });
//         };

//         cartEvent();
//       }
//       if (e.data.event === 'quantity_woocommerce') {
//         quantityCartWoo(e.data.payload.wdomain);
//       }
//       if (e.data.event === 'quantity_shopify') {
//         quantityCartShop();
//       }
//       // invert position of chatbot and widget
//       if (e.data.payload && e.data.payload.bot_id) {
//         let invertPosition = [683, 1134, 7].includes(e.data.payload.bot_id);

//         if (invertPosition) {
//           t.firstChild.classList.add('p-left');
//           const iframe = document.getElementById('whatsapp_box_identifier');

//           if (iframe) {
//             iframe.classList.add('p-right');
//           }
//         }
//       }
//     });

//     const quantityCartShop = async () => {
//       const databotIframe = document.getElementById('chat_box_identifier');
//       const request = await fetch('/cart.js', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       let response = await request.json();
//       let cartShopify = await response.items;
//       let countGeneral = 0;
//       cartShopify.forEach((element) => {
//         countGeneral = countGeneral + element.quantity;
//       });
//       console.log('cantidad carro shop ', countGeneral);
//       databotIframe.contentWindow.postMessage(
//         { event: 'countTotalCartShopify', payload: { quantity: countGeneral } },
//         url_env,
//       );
//     };

//     const quantityCartWoo = async (wdomain) => {
//       const databotIframe = document.getElementById('chat_box_identifier');
//       const res = await fetch(`${wdomain}/wp-json/wc/store/v1/cart/items`);
//       let cart = await res.json();
//       let countGeneral = 0;
//       cart.forEach((element) => {
//         countGeneral += element.quantity;
//       });
//       databotIframe.contentWindow.postMessage(
//         {
//           event: 'countTotalCartWocommerce',
//           payload: { quantity: countGeneral },
//         },
//         url_env,
//       );
//     };
//     // iframe whatsapp moved to event show_widget
//     t.innerHTML = `<iframe style="display:none;" id="chat_box_identifier" class="compact" src=\'${url_env}/bot?id=${id}&token=${token}&clientPathName=${clientPathName}&clientHostName=${clientHostName}'></iframe>`; // local
//     document.getElementsByTagName('body')[0].append(t);
//     // insertting dynamically script
//     const allowed = [683];
//     if (
//       allowed.includes(parseInt(id)) &&
//       url_env === 'https://databot-api.herokuapp.com'
//     ) {
//       let script = document.createElement('script');
//       script.async = true;
//       script.setAttribute('src', url_env + '/advance_bots/' + id + '.js');
//       document.body.appendChild(script);
//     }
//   }

//   setChabot();
// })();