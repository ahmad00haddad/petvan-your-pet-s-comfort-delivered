const fs = require('fs');
let code = fs.readFileSync('src/lib/i18n.ts', 'utf8');

const additionalEn = `
    petShop: "Pet Shop",
    noItems: "No items found",
    noItemsDesc: "We couldn't find any products matching your current filters. Try selecting a different category.",
    clearFilters: "Clear Filters",
    bestSeller: "Best Seller",
    newArrival: "New Arrival",
    flavor: "Flavor",
    ageGroup: "Age Group",
    addToCartText: "Add to Cart",
    cartEmpty: "Your Cart is Empty",
    cartEmptyDesc: "Looks like you haven't added anything to your cart yet.",
    browseProducts: "Browse Products",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    delivery: "Delivery",
    proceedCheckout: "Proceed to Checkout",
    free: "Free",
    clearCart: "Clear Cart",
    adoptCenter: "Adoption Center",
    adoptCenterDesc: "Meet your new best friend and give them a forever home.",
    showAllPets: "Show All Pets (Match Me)",
    matchMe: "Match Me",
    adoptBtn: "Adopt",
    adoptProcess: "Adoption Process",
    aboutPet: "About",
    healthStatus: "Health Status",
    personality: "Personality",
    customer: "customer",
    petsCount: "Pets",
    ordersCount: "Orders",
    pointsCount: "Points",
    yourFamily: "Your Family",
    noPets: "No pets added yet.",
    listAdoption: "List for Adoption",
    listAdoptionDesc: "Are you sure you want to list this pet for adoption? Please provide a brief description to help them find a loving home.",
    confirmListing: "Confirm Listing",
    cancel: "Cancel",
    listing: "Listing...",
    addNewPet: "Add a New Pet",
    addNewPetDesc: "Fill in the details to add your pet to your profile.",
    petName: "Pet Name",
    petType: "Pet Type",
    gender: "Gender",
    male: "Male",
    female: "Female",
    adding: "Adding...",
    photo: "Photo",
    catsWord: "Cats",
    dogsWord: "Dogs",
    birdsWord: "Birds",
    fishWord: "Fish",
    otherWord: "Other",
    checkoutDetails: "Checkout Details",
    enterDelivery: "Please enter your delivery details to complete your order of",
    itemsWord: "items",
    deliveryAddress: "Delivery Address",
    phoneNumber: "Phone Number",
    paymentMethod: "Payment Method",
    cashOnDelivery: "Cash on Delivery",
    totalToPay: "Total to pay",
    processing: "Processing...",
    confirmPayment: "Confirm Payment",
`;

const additionalAr = `
    petShop: "متجرالحيوانتP""�Т��FV�3�-�M�R�����R�}�M���������M�����m�}�]�"�Т��FV�4FW63�-�M�R�m���]�=�m��]��]�b�]�}�������M������]�]���͊}�����}�}���"�����}�]�B�}�M���]������}�M�݊}�M������͋"��b�b�b�f+b�băfb�b��fb�b�ffb�b����4(�����������ѕ��耋fb�b��b�f#b�ff�b�fb�b�ff+b���4(��������M�����耋b�fb�fb�făfb�f+b�b�f,��4(��������ɥم�耋f#b�f�b�b�f+b�f,��4(�������ٽ�耋b�ffffb���4(�������ɽ��耋b�ffb�b��b�fb�fb�b�b���4(�������Q����Q���耋b�b�f�b�ff$�b�fb�fb���4(������������耋b�fb��b�fb�b�f#f�fb�b�b�b���4(�������������͌耋f+b�b�f �b�fb�ff�b�ffb0�b�b�f�b�fb��b�f(�b�f+b��ff$�b�fb��b�fb�b�f#f�b�fb�b�b�b��b�f�b�b�b����4(�����ɽ�͕Aɽ�Ս��耋b�b�fb��b�fffb�b�b�b���4(�����ɑ��Mյ����耋ffb�bԃb�fb�fb���4(�����Չѽх�耋b�ffb3ff#b�b�ffb�b�f(��4(��������ٕ��耋b�fb�f#b�f+f��4(�����ɽ�����������耋fb�b�b�b�b��b�fb�fb䈰4(�����ɕ�耋fb�b�ff(��4(������������耋b�fb�f+f�b�fb�fb���4(�����������ѕ�耋ffăfb�b�fb�b�ff(��4(�����������ѕ��͌耋fb�b�f�b�b�f+ff�b�fffb�f�b�fb�b�f+b��f#b�ffb�f�ffb�ffbȃb�b�b�f?f;b����4(����͡����A���耋b�b�b؃b�ff+b�b�fb�f+f#b�fb�b���4(������э�5�耋b�b�b�fff(��4(���������	Ѹ耋b�b�ff(��4(���������Aɽ����耋b�fff+b��b�fb�b�ff(��4(���������A��耋fb�b�b���4(��������ѡMх���耋b�fb�b�fb��b�fb�b�f+f���4(�������ͽ������耋b�fb�b�b�f+f���4(�������ѽ���耋b�ff+f��4(���������չ�耋b�f+f#b�fb�b���4(�����ɑ����չ�耋b�fb�b�b���4(�����������չ�耋ffb�bԈ�4(������������耋b�b�b�fb�f��4(������A���耋ff�f+b�f�b�b�b�fb��b�f(�b�f+f#b�fb�b��b�ff+fb��b�b�b����4(�����������ѥ��耋b�b�b؃ffb�b�ff(��4(�����������ѥ���͌耋ff�b�fb��fb�b�ff�b�ff�b�b�f+b��b�b�b؃fb�b��b�fb�f+f#b�f�ffb�b�ff+b|�ff+b�b��b�fb�f+f�f#b�f�ff#b�bȃffb�b�b�b�b�n�ff(�b�fb�b�f#băb�ff$�ffb�f�fb�b����4(���������ɵ1��ѥ��耋b�b�bf+b��b�fb�b�b؈�4(����������耋b�fb�b�b���4(�������ѥ��耋b�b�băfb�b�b�bظ����4(�������9��A��耋b�b�b�fb��b�f+f#b�f�b�bf+f�b�b�f+b���4(�������9��A���͌耋b�ffb��b�fb�fb�b�f+f�fb�f�b�fb��b�f+f#b�ff�b�fb�ff+f�b�ff$�ffff�b�fb�b�b�f$���4(�������9���耋b�b�f�b�fb�f+f#b�f��4(�������Q���耋ff#b�b�fb�f+f#b�f��4(����������耋b�fb�fb̈�4(��������耋b�fbĈ�4(����������耋b�fb�f$��4(����������耋b�b�b�f(�b�fb�b�b�fb������4(�������Ѽ耋b�fb�f#bĈ�4(��������]�ɐ耋fb�b܈�4(��������]�ɐ耋ffb�b���4(������ɑ�]�ɐ耋b�f+f#bĈ�4(������͡]�ɐ耋b�b�fb�f��4(�����ѡ��]�ɐ耋b�b�b�f$��4(�������������х���耋b�fb�b�f+f�b�fb�fb䈰4(������ѕ����ٕ��耋f+b�b�f$�b�b�b�b�f�b�fb�b�f+f�b�fb�f#b�f+f�fb�ffb�f�b�fb�f�b�ffff#f�ff��4(�����ѕ��]�ɐ耋b�fb�b�bĈ�4(��������ٕ����ɕ��耋b�ff#b�f�b�fb�f#b�f+f��4(���������9յ���耋b�ff�b�ffb�b�f��4(������嵕��5�ѡ��耋b�b�f+fb��b�fb�fb䈰4(������͡=����ٕ��耋b�fb�fb�b�fb��b�fb�b�b�fb�f��4(����ѽх�Q�A��耋b�fb�b�fb�ff(�ffb�fb䈰4(�����ɽ���ͥ��耋b�b�b�fb�fb�nb�fb�b������4(���������ɵA�嵕��耋b�b�ff+b�~`�b�fb�fb䈰4)��4(4)��Ё�������􁍽���ɕ�����������q��q�myt�?)(\},\s*ar:\s*\{)/, `${1}${additionalEn}${2}`);
newCode = newCode.replace(/(ar:\s*\{.z
�>)(\}\s*\;\s*export type Copy)/, `${1}${additionalAr}${2}`);

fs.writeFileSync('src/lib/i18n.ts', newCode);
console.log('done');
