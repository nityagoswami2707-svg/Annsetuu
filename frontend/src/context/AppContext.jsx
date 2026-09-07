import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

const INITIAL_USERS = [
  {
    id: "USR-ADMIN-01",
    name: "Annsetu Master Admin",
    email: "admin@annsetu.demo",
    adminId: "ANNSETU-ADMIN-01",
    phone: "+91 99999 00000",
    password: "AnnSetu@2026Demo",
    role: "admin",
    verificationStatus: "Verified",
    createdAt: "2026-01-01"
  },
  {
    id: "USR-DONOR-01",
    name: "AnnSetu Verified Donor",
    email: "donor@annsetu.demo",
    phone: "9428099887",
    password: "Donor@2026Demo",
    role: "donor",
    verificationStatus: "Verified",
    city: "Vadodara",
    address: "1st Floor, Crystal Plaza, Vadodara",
    pincode: "390007",
    createdAt: "2026-01-15"
  },
  {
    id: "USR-NGO-01",
    name: "Hope Foundation India",
    email: "ngo@annsetu.demo",
    phone: "9876543210",
    password: "Ngo@2026Demo",
    role: "ngo",
    organizationType: "NGO",
    regNo: "REG-2021-987654",
    contactPerson: "Dr. Rajesh Sharma",
    verificationStatus: "Verified",
    city: "Vadodara",
    address: "Plot 45, Community Center, Alkapuri",
    pincode: "390007",
    createdAt: "2026-02-01"
  },
  {
    id: "USR-NGO-02",
    name: "Shree Krishna Gaushala & Animal Shelter",
    email: "gaushala@annsetu.demo",
    phone: "9825099887",
    password: "Ngo@2026Demo",
    role: "ngo",
    organizationType: "Gaushala / Animal Feed Organization",
    regNo: "REG-2022-778899",
    contactPerson: "Gopal Bhai Patel",
    verificationStatus: "Verified",
    city: "Vadodara",
    address: "National Highway 8, Makarpura, Vadodara",
    pincode: "390014",
    createdAt: "2026-02-15"
  },
  {
    id: "USR-VOL-01",
    name: "Ramesh Kumar",
    email: "volunteer@annsetu.demo",
    phone: "9106633221",
    password: "Volunteer@2026Demo",
    role: "volunteer",
    vehicleType: "Car / EV",
    verificationStatus: "Verified",
    city: "Vadodara",
    address: "Akota Road, Vadodara",
    pincode: "390020",
    createdAt: "2026-02-10"
  }
];

const INITIAL_NGOS = [
  {
    id: "NGO-101",
    name: "Hope Foundation India",
    registrationNo: "REG-2021-987654",
    contactPerson: "Dr. Rajesh Sharma",
    email: "contact@hopefoundation.org",
    phone: "+91 98765 43210",
    address: "Plot 45, Community Center, Alkapuri",
    city: "Vadodara",
    pincode: "390007",
    type: "Food & Nutrition NGO",
    organizationType: "NGO",
    areasServed: "Alkapuri, Fatehgunj, Sayajigunj",
    peopleServedPerDay: 450,
    availableCapacity: "500 meals/day",
    verificationStatus: "Verified",
    badge: "Verified NGO Badge",
    avatar: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "NGO-102",
    name: "Annam Relief Trust",
    registrationNo: "REG-2019-456789",
    contactPerson: "Priya Patel",
    email: "info@annamrelief.org",
    phone: "+91 98250 11223",
    address: "12, Shanti Complex, Race Course Road",
    city: "Vadodara",
    pincode: "390015",
    type: "Grassroots Hunger Mitigation",
    organizationType: "NGO",
    areasServed: "Gorwa, Subhanpura, Gotri",
    peopleServedPerDay: 300,
    availableCapacity: "350 meals/day",
    verificationStatus: "Verified",
    badge: "Verified NGO Badge",
    avatar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "NGO-103",
    name: "Seva Community Kitchen",
    registrationNo: "REG-2023-112233",
    contactPerson: "Amitabh Shah",
    email: "seva.kitchen@gmail.com",
    phone: "+91 99099 55443",
    address: "88, Heritage Square, Akota",
    city: "Vadodara",
    pincode: "390020",
    type: "Voluntary Meal Distribution",
    organizationType: "NGO",
    areasServed: "Akota, Tandalja, Old City",
    peopleServedPerDay: 200,
    availableCapacity: "250 meals/day",
    verificationStatus: "Pending",
    badge: "Under Verification",
    avatar: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "NGO-104",
    name: "Shree Krishna Gaushala & Animal Shelter",
    registrationNo: "REG-2022-778899",
    contactPerson: "Gopal Bhai Patel",
    email: "gaushala@annsetu.demo",
    phone: "+91 98250 99887",
    address: "National Highway 8, Makarpura",
    city: "Vadodara",
    pincode: "390014",
    type: "Gaushala / Animal Feed Organization",
    organizationType: "Gaushala / Animal Feed Organization",
    areasServed: "Vadodara Metropolitan & Rural Outskirts",
    peopleServedPerDay: 400,
    availableCapacity: "1000 KG waste/day",
    verificationStatus: "Verified",
    badge: "Verified Gaushala Badge",
    avatar: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=150&auto=format&fit=crop&q=80"
  }
];

// Helper: Calculate Priority Score for NGO Requirement (0 to 100)
export const calculatePriorityScore = (req) => {
  let score = 0;

  // 1. Urgency Level (Max 40 points)
  if (req.urgencyLevel === 'Emergency') score += 40;
  else if (req.urgencyLevel === 'Urgent') score += 30;
  else if (req.urgencyLevel === 'Normal') score += 10;

  // 2. Required Date (Max 30 points)
  const today = new Date().toISOString().split('T')[0];
  const reqDate = req.requiredByDate;
  if (reqDate === today) {
    score += 30;
  } else if (reqDate) {
    const reqD = new Date(reqDate);
    const todayD = new Date(today);
    const diffDays = Math.ceil((reqD - todayD) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) score += 20;
    else if (diffDays <= 3) score += 10;
    else score += 5;
  } else {
    score += 10;
  }

  // 3. People Count / Beneficiaries (Max 20 points)
  const count = parseInt(req.peopleCount) || 0;
  if (count >= 300) score += 20;
  else if (count >= 150) score += 15;
  else if (count >= 50) score += 10;
  else score += 5;

  // 4. Remaining Requirement % (Max 10 points)
  const reqQty = parseInt(req.quantityRequired) || 1;
  const remQty = req.remainingQuantity !== undefined ? parseInt(req.remainingQuantity) : reqQty;
  const remPct = (remQty / reqQty) * 100;
  if (remPct >= 80) score += 10;
  else if (remPct >= 50) score += 7;
  else if (remPct >= 20) score += 4;
  else score += 2;

  let priorityLevel = "P4 Normal";
  let priorityBadge = "🟢 P4 Normal";
  let colorClass = "bg-green-100 text-green-800 border-green-300";

  if (score >= 80) {
    priorityLevel = "P1 Critical";
    priorityBadge = "🔴 P1 Critical";
    colorClass = "bg-red-100 text-red-800 border-red-300 animate-pulse";
  } else if (score >= 60) {
    priorityLevel = "P2 High";
    priorityBadge = "🟠 P2 High";
    colorClass = "bg-orange-100 text-orange-800 border-orange-300";
  } else if (score >= 40) {
    priorityLevel = "P3 Medium";
    priorityBadge = "🟡 P3 Medium";
    colorClass = "bg-yellow-100 text-yellow-800 border-yellow-300";
  }

  return { score, priorityLevel, priorityBadge, colorClass };
};

const INITIAL_NGO_REQUESTS = [
  {
    id: "REQ-2026-001",
    ngoId: "NGO-101",
    ngoName: "Hope Foundation India",
    organizationType: "NGO",
    foodCategory: "Prepared Cooked Food",
    quantityRequired: 150,
    quantityFulfilled: 60,
    remainingQuantity: 90,
    unit: "meals",
    urgencyLevel: "Emergency",
    requiredByDate: new Date().toISOString().split('T')[0],
    requiredByTime: "20:00",
    peopleCount: 350,
    city: "Vadodara",
    address: "Plot 45, Community Center, Alkapuri",
    pincode: "390007",
    notes: "Urgent need for dinner meals for shelter home children.",
    status: "Active",
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  },
  {
    id: "REQ-2026-002",
    ngoId: "NGO-102",
    ngoName: "Annam Relief Trust",
    organizationType: "NGO",
    foodCategory: "Grocery / Raw Food",
    quantityRequired: 200,
    quantityFulfilled: 50,
    remainingQuantity: 150,
    unit: "meals",
    urgencyLevel: "Urgent",
    requiredByDate: new Date().toISOString().split('T')[0],
    requiredByTime: "21:30",
    peopleCount: 200,
    city: "Vadodara",
    address: "12, Shanti Complex, Race Course Road",
    pincode: "390015",
    notes: "Raw rice, dal & wheat flour needed for community kitchen.",
    status: "Active",
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  },
  {
    id: "REQ-2026-003",
    ngoId: "NGO-104",
    ngoName: "Shree Krishna Gaushala & Animal Shelter",
    organizationType: "Gaushala / Animal Feed Organization",
    foodCategory: "Vegetable/Organic Waste",
    quantityRequired: 300,
    quantityFulfilled: 100,
    remainingQuantity: 200,
    unit: "KG",
    isOrganicWaste: true,
    urgencyLevel: "Urgent",
    requiredByDate: new Date().toISOString().split('T')[0],
    requiredByTime: "18:00",
    peopleCount: 150,
    city: "Vadodara",
    address: "National Highway 8, Makarpura",
    pincode: "390014",
    notes: "Vegetable peels, raw greens & fruit scrap needed for 400+ rescued cows & animals.",
    status: "Active",
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  }
];

const INITIAL_DONATIONS = [
  {
    id: "ANS-2026-000123",
    donorName: "AnnSetu Verified Donor",
    donorType: "Restaurant",
    foodName: "Paneer Butter Masala & Steamed Basmati Rice",
    foodCategory: "Prepared Cooked Food",
    quantity: "15",
    servingCapacity: 50,
    prepDate: "2026-08-06",
    prepTime: "20:30",
    foodCondition: "Freshly prepared evening surplus, kept under thermal insulation",
    foodQuality: "Fresh",
    pickupAddress: "1st Floor, Crystal Plaza, Jetaipur Main Rd, Vadodara",
    city: "Vadodara",
    pincode: "390007",
    contactPerson: "Vikram Mehta (Head Chef)",
    phone: "+91 94280 99887",
    specialInstructions: "Use back entry elevator for fast loading.",
    safetyConfirmed: true,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    status: "In Transit",
    ngoId: "NGO-101",
    ngoName: "Hope Foundation India",
    deliveryDriver: {
      name: "Ramesh Kumar",
      phone: "+91 91066 33221",
      vehicleNo: "GJ-06-EV-4412",
      currentLocation: "En route near Akota Flyover (ETA 12 mins)"
    },
    createdAt: "2026-08-06 21:15",
    is_test_record: false,
    timeline: [
      { status: "Donation Registered", timestamp: "2026-08-06 21:15", detail: "Registered by AnnSetu Verified Donor", completed: true },
      { status: "NGO Request Sent", timestamp: "2026-08-06 21:16", detail: "Dispatched to Hope Foundation India", completed: true },
      { status: "NGO Accepted", timestamp: "2026-08-06 21:25", detail: "Accepted by Hope Foundation (Dr. Rajesh)", completed: true },
      { status: "Pickup Assigned", timestamp: "2026-08-06 21:30", detail: "Assigned to Ramesh Kumar (EV Van)", completed: true },
      { status: "Food Picked Up", timestamp: "2026-08-06 22:00", detail: "Collected from Green Leaf Kitchen", completed: true },
      { status: "In Transit", timestamp: "2026-08-06 22:10", detail: "En route to Hope Foundation Shelter", completed: true },
      { status: "Delivered", timestamp: "--", detail: "Awaiting final confirmation at shelter", completed: false }
    ],
    rejectionReason: ""
  },
  {
    id: "ANS-2026-000124",
    donorName: "Royal Heritage Wedding Hall",
    donorType: "Wedding",
    foodName: "Assorted Gujarati Thali & Sweets (Laddoo, Puri, Subzi)",
    foodCategory: "Catering Surplus",
    quantity: "35",
    servingCapacity: 120,
    prepDate: "2026-08-06",
    prepTime: "21:00",
    foodCondition: "High quality wedding feast surplus",
    foodQuality: "Fresh",
    pickupAddress: "Royal Heritage Palace, Sevasi Canal Road, Vadodara",
    city: "Vadodara",
    pincode: "390021",
    contactPerson: "Harish Bhai",
    phone: "+91 97129 44332",
    specialInstructions: "Large vessel containers available for exchange.",
    safetyConfirmed: true,
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80",
    status: "Accepted",
    ngoId: "NGO-102",
    ngoName: "Annam Relief Trust",
    deliveryDriver: {
      name: "Suresh Volunteer",
      phone: "+91 98980 77665",
      vehicleNo: "GJ-06-AB-8821",
      currentLocation: "Dispatching from Annam HQ"
    },
    createdAt: "2026-08-06 22:00",
    is_test_record: false,
    timeline: [
      { status: "Donation Registered", timestamp: "2026-08-06 22:00", detail: "Registered by Royal Heritage Hall", completed: true },
      { status: "NGO Request Sent", timestamp: "2026-08-06 22:02", detail: "Sent to Annam Relief Trust", completed: true },
      { status: "NGO Accepted", timestamp: "2026-08-06 22:15", detail: "Accepted by Annam Relief Trust", completed: true },
      { status: "Pickup Assigned", timestamp: "2026-08-06 22:20", detail: "Driver Suresh Volunteer assigned", completed: true },
      { status: "Food Picked Up", timestamp: "--", detail: "Pending driver arrival", completed: false },
      { status: "In Transit", timestamp: "--", detail: "Pending", completed: false },
      { status: "Delivered", timestamp: "--", detail: "Pending", completed: false }
    ],
    rejectionReason: ""
  },
  {
    id: "ANS-2026-000120",
    donorName: "Grand Central Cafe",
    donorType: "Cafe",
    foodName: "Fresh Baked Breads, Sandwiches & Pastries",
    foodCategory: "Bakery / Packaged",
    quantity: "8",
    servingCapacity: 30,
    prepDate: "2026-08-06",
    prepTime: "18:00",
    foodCondition: "Intact clean packaged baked items",
    foodQuality: "Good",
    pickupAddress: "Shop 14, Inox Multiplex Arcade, Race Course",
    city: "Vadodara",
    pincode: "390007",
    contactPerson: "Kavita Rao",
    phone: "+91 93771 22334",
    specialInstructions: "Packed in hygenic cardboard boxes.",
    safetyConfirmed: true,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    status: "Delivered",
    ngoId: "NGO-101",
    ngoName: "Hope Foundation India",
    deliveryDriver: {
      name: "Ramesh Kumar",
      phone: "+91 91066 33221",
      vehicleNo: "GJ-06-EV-4412",
      currentLocation: "Delivered successfully"
    },
    createdAt: "2026-08-06 18:30",
    is_test_record: false,
    timeline: [
      { status: "Donation Registered", timestamp: "2026-08-06 18:30", detail: "Registered by Grand Central Cafe", completed: true },
      { status: "NGO Request Sent", timestamp: "2026-08-06 18:32", detail: "Sent to Hope Foundation India", completed: true },
      { status: "NGO Accepted", timestamp: "2026-08-06 18:40", detail: "Accepted by Hope Foundation", completed: true },
      { status: "Pickup Assigned", timestamp: "2026-08-06 18:45", detail: "Assigned to Ramesh Kumar", completed: true },
      { status: "Food Picked Up", timestamp: "2026-08-06 19:10", detail: "Collected from Cafe", completed: true },
      { status: "In Transit", timestamp: "2026-08-06 19:25", detail: "En route to Shelter", completed: true },
      { status: "Delivered", timestamp: "2026-08-06 19:50", detail: "Received by Hope Foundation Shelter Staff", completed: true }
    ],
    rejectionReason: ""
  }
];

const INITIAL_CERTIFICATES = [
  {
    id: "ANN-DON-2026-000123",
    userId: "USR-DONOR-01",
    userName: "AnnSetu Verified Donor",
    role: "donor",
    level: "Bronze",
    verifiedServices: 12,
    impactPoints: 120,
    issuedAt: "2026-08-15",
    verificationCode: "ANN-DON-2026-000123",
    status: "Valid"
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Donation Delivered! 🎉",
    message: "Donation ANS-2026-000120 (30 Meals) from Grand Central Cafe was successfully delivered to Hope Foundation India.",
    time: "25 mins ago",
    type: "success",
    read: false
  },
  {
    id: 2,
    title: "NGO Accepted Request 🤝",
    message: "Annam Relief Trust accepted donation ANS-2026-000124 (120 portions from Royal Heritage Hall).",
    time: "1 hour ago",
    type: "info",
    read: false
  },
  {
    id: 3,
    title: "New Surplus Food Registered 🍱",
    message: "AnnSetu Verified Donor registered 50 meals (ANS-2026-000123). Driver Ramesh assigned.",
    time: "2 hours ago",
    type: "warning",
    read: true
  }
];

// Password validation helper
export const validatePasswordStrength = (password) => {
  if (!password) return { isValid: false, score: 'Weak', errors: ["Password is required."] };

  const errors = [];
  if (password.length < 8) errors.push("Minimum 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("1 uppercase letter (A-Z)");
  if (!/[a-z]/.test(password)) errors.push("1 lowercase letter (a-z)");
  if (!/[0-9]/.test(password)) errors.push("1 number (0-9)");
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push("1 special character (!@#$%^&*)");

  const passedCount = 5 - errors.length;
  let score = 'Weak';
  if (passedCount >= 5) score = 'Strong';
  else if (passedCount >= 3) score = 'Medium';

  return {
    isValid: errors.length === 0,
    score,
    errors
  };
};

export const AppProvider = ({ children }) => {
  // Load saved language or default to 'en'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('annsetu_language') || 'en';
  });

  // User Accounts & Authentication State
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('annsetu_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [role, setRole] = useState(() => currentUser?.role || 'donor');
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [ngos, setNgos] = useState(INITIAL_NGOS);
  const [ngoRequests, setNgoRequests] = useState(INITIAL_NGO_REQUESTS);
  const [requestContributions, setRequestContributions] = useState([]);
  const [certificates, setCertificates] = useState(INITIAL_CERTIFICATES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selectedReceiptDonation, setSelectedReceiptDonation] = useState(null);
  const [activeToast, setActiveToast] = useState(null);
  const [isRealtimeActive, setIsRealtimeActive] = useState(true);

  // NGO Requirement Handlers
  const createNgoRequirement = (formData) => {
    const nextSeq = ngoRequests.length + 1;
    const reqId = `REQ-2026-${String(nextSeq).padStart(3, '0')}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    
    const isWaste = formData.foodCategory === 'Vegetable/Organic Waste';
    const unit = isWaste ? 'KG' : 'meals';
    const qty = parseInt(formData.quantityRequired) || 50;

    const activeNgoUser = ngos.find(n => n.email === currentUser?.email) || ngos[0];

    const newReq = {
      id: reqId,
      ngoId: activeNgoUser?.id || currentUser?.id || "NGO-101",
      ngoName: currentUser?.name || activeNgoUser?.name || "Hope Foundation India",
      organizationType: currentUser?.organizationType || activeNgoUser?.organizationType || (isWaste ? "Gaushala / Animal Feed Organization" : "NGO"),
      foodCategory: formData.foodCategory || "Prepared Cooked Food",
      quantityRequired: qty,
      quantityFulfilled: 0,
      remainingQuantity: qty,
      unit: unit,
      isOrganicWaste: isWaste,
      urgencyLevel: formData.urgencyLevel || "Normal",
      requiredByDate: formData.requiredByDate || new Date().toISOString().split('T')[0],
      requiredByTime: formData.requiredByTime || "20:00",
      peopleCount: parseInt(formData.peopleCount) || 50,
      city: formData.city || currentUser?.city || "Vadodara",
      address: formData.address || currentUser?.address || "Vadodara",
      pincode: formData.pincode || currentUser?.pincode || "390001",
      notes: formData.notes || "",
      status: "Active",
      createdAt: nowStr
    };

    setNgoRequests(prev => [newReq, ...prev]);
    addNotification("Requirement Posted! 📢", `NGO Food Requirement ${reqId} (${newReq.quantityRequired} ${unit}) published.`, "success");
    return newReq;
  };

  const fulfillNgoRequirement = (requestId, offeredQuantity, donorInfo = {}) => {
    const offerQty = parseInt(offeredQuantity);
    if (!offerQty || offerQty <= 0) {
      return { success: false, error: "Please enter a valid quantity." };
    }

    const targetReq = ngoRequests.find(r => r.id === requestId);
    if (!targetReq) {
      return { success: false, error: "Requirement not found." };
    }

    const unitLabel = targetReq.unit || (targetReq.isOrganicWaste ? 'KG' : 'meals');

    if (offerQty > targetReq.remainingQuantity) {
      return {
        success: false,
        error: `Only ${targetReq.remainingQuantity} ${unitLabel} are currently required for this request.`
      };
    }

    const newFulfilled = targetReq.quantityFulfilled + offerQty;
    const newRemaining = targetReq.remainingQuantity - offerQty;
    const newStatus = newRemaining === 0 ? 'Fully Fulfilled' : 'Partially Fulfilled';

    const updatedReqs = ngoRequests.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          quantityFulfilled: newFulfilled,
          remainingQuantity: newRemaining,
          status: newStatus
        };
      }
      return r;
    });

    setNgoRequests(updatedReqs);

    // Record contribution log
    const contribution = {
      id: `CTR-2026-${Date.now().toString().slice(-6)}`,
      requestId: targetReq.id,
      donorName: donorInfo.donorName || currentUser?.name || "Anonymous Donor",
      donorId: currentUser?.id || "USR-DONOR-01",
      offeredQuantity: offerQty,
      unit: unitLabel,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setRequestContributions(prev => [contribution, ...prev]);

    // Also register corresponding donation entry so tracking & receipts work automatically!
    registerDonation({
      donorName: donorInfo.donorName || currentUser?.name || "Community Partner",
      donorType: donorInfo.donorType || "Restaurant Partner",
      foodName: `${targetReq.foodCategory} (Matched for ${targetReq.ngoName})`,
      foodCategory: targetReq.foodCategory,
      quantity: `${offerQty} ${unitLabel}`,
      servingCapacity: targetReq.isOrganicWaste ? 0 : offerQty,
      prepDate: new Date().toISOString().split('T')[0],
      prepTime: "Immediate",
      pickupAddress: donorInfo.pickupAddress || currentUser?.address || "Vadodara Central Store",
      city: donorInfo.city || currentUser?.city || targetReq.city,
      pincode: donorInfo.pincode || currentUser?.pincode || targetReq.pincode,
      phone: donorInfo.phone || currentUser?.phone || "+91 99999 00000",
      contactPerson: donorInfo.contactPerson || currentUser?.name || "Donor Contact",
      safetyConfirmed: true,
      ngoId: targetReq.ngoId,
      specialInstructions: `Fulfillment offer for Requirement ${targetReq.id}`
    });

    addNotification("Fulfillment Recorded! 🎉", `Thank you! You offered ${offerQty} ${unitLabel} for ${targetReq.ngoName}.`, "success");
    return {
      success: true,
      message: `Successfully offered ${offerQty} ${unitLabel}!`
    };
  };

  const cancelNgoRequirement = (requestId) => {
    setNgoRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Cancelled' } : r));
    addNotification("Requirement Cancelled", `Requirement ${requestId} was cancelled.`, "info");
  };

  const getAdminAnalytics = () => {
    // Overall stats
    const totalDonationsCount = donations.length;
    const totalMealsDonated = donations.reduce((acc, d) => acc + (parseInt(d.servingCapacity) || 0), 0);
    
    // Vegetable Waste Stats (in KG)
    const vegWasteDonations = donations.filter(d => 
      d.foodCategory === 'Vegetable/Organic Waste' || (d.quantity && d.quantity.toLowerCase().includes('kg'))
    );
    const totalOrganicWasteKg = vegWasteDonations.reduce((acc, d) => {
      const match = d.quantity ? d.quantity.match(/(\d+(\.\d+)?)/) : null;
      return acc + (match ? parseFloat(match[1]) : 0);
    }, 0) + 450;

    // Weekend vs Weekday Donated % Change
    let weekdayQty = 0;
    let weekendQty = 0;

    donations.forEach(d => {
      const dateObj = new Date(d.createdAt || d.prepDate || Date.now());
      const day = dateObj.getDay();
      const qty = parseInt(d.servingCapacity) || (parseFloat(d.quantity) || 10);
      if (day === 0 || day === 6) {
        weekendQty += qty;
      } else {
        weekdayQty += qty;
      }
    });

    if (weekendQty === 0 && weekdayQty === 0) {
      weekendQty = 650;
      weekdayQty = 480;
    } else if (weekdayQty === 0) {
      weekdayQty = 100;
    }

    const pctChange = (((weekendQty - weekdayQty) / weekdayQty) * 100).toFixed(1);

    const dailyData = [
      { day: "Mon", meals: 120, wasteKg: 35 },
      { day: "Tue", meals: 145, wasteKg: 40 },
      { day: "Wed", meals: 160, wasteKg: 42 },
      { day: "Thu", meals: 180, wasteKg: 50 },
      { day: "Fri", meals: 220, wasteKg: 65 },
      { day: "Sat", meals: 340, wasteKg: 110 },
      { day: "Sun", meals: 380, wasteKg: 125 }
    ];

    const categoryDistribution = [
      { category: "Prepared Cooked Food", count: donations.filter(d => d.foodCategory === 'Prepared Cooked Food').length + 8, color: "#10b981" },
      { category: "Catering Surplus", count: donations.filter(d => d.foodCategory === 'Catering Surplus').length + 4, color: "#f59e0b" },
      { category: "Bakery / Packaged", count: donations.filter(d => d.foodCategory === 'Bakery / Packaged').length + 3, color: "#3b82f6" },
      { category: "Grocery / Raw Food", count: donations.filter(d => d.foodCategory === 'Grocery / Raw Food').length + 2, color: "#8b5cf6" },
      { category: "Vegetable/Organic Waste", count: vegWasteDonations.length + 5, color: "#84cc16" }
    ];

    return {
      totalDonationsCount,
      totalMealsDonated,
      totalOrganicWasteKg,
      weekdayQty,
      weekendQty,
      pctChange,
      dailyData,
      categoryDistribution
    };
  };

  // Sync document element lang attribute whenever language changes
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('annsetu_language', language);
  }, [language]);

  // Sync current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('annsetu_user', JSON.stringify(currentUser));
      setRole(currentUser.role);
    } else {
      localStorage.removeItem('annsetu_user');
    }
  }, [currentUser]);

  // SUPABASE REAL-TIME DATABASE SUBSCRIPTION
  useEffect(() => {
    let channel;
    try {
      channel = supabase
        .channel('public:donations')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, (payload) => {
          console.log('⚡ Supabase Realtime Event Received:', payload);
          if (payload.eventType === 'INSERT') {
            setDonations(prev => [payload.new, ...prev]);
            addNotification("Real-Time Donation Added! 🍱", `New donation ${payload.new.id} received via Supabase Real-Time.`, "success");
          } else if (payload.eventType === 'UPDATE') {
            setDonations(prev => prev.map(item => item.id === payload.new.id ? { ...item, ...payload.new } : item));
            addNotification("Real-Time Status Update ⚡", `Donation ${payload.new.id} updated in database to ${payload.new.status}.`, "info");
          }
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setIsRealtimeActive(true);
          }
        });
    } catch (err) {
      console.warn("Supabase Real-Time Note:", err.message);
    }

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  // Translation helper
  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('annsetu_language', langCode);
    document.documentElement.lang = langCode;
    const langNames = { en: "English", hi: "हिन्दी", gu: "ગુજરાતી" };
    showToast("Language Preference Updated", `Website language set to ${langNames[langCode] || langCode}.`, "info");
  };

  // Authentication Logic
  const loginUser = (identifier, password, targetRole) => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/[^0-9]/g, '');

    const found = users.find(u => 
      u.email.toLowerCase() === cleanId ||
      (u.adminId && u.adminId.toLowerCase() === cleanId) ||
      (u.phone && cleanPhone.length > 5 && u.phone.replace(/[^0-9]/g, '').includes(cleanPhone))
    );

    if (!found || found.password !== password) {
      const errMsg = targetRole === 'admin' ? t('adminInvalidCredsMsg') : t('invalidCredsMsg');
      return { success: false, error: errMsg };
    }

    // Role check for target portal tab
    if (targetRole && found.role !== targetRole) {
      if (targetRole === 'admin' && found.role !== 'admin') {
        return { success: false, error: `This account is registered as a ${found.role.toUpperCase()}. It does not have Admin authorization. Please switch to the ${found.role.toUpperCase()} tab to log in.` };
      }
      if (found.role !== 'admin') {
        return { success: false, error: `This account is registered as a ${found.role.toUpperCase()}. Please switch to the ${found.role.toUpperCase()} tab to log in.` };
      }
    }

    setCurrentUser(found);
    setRole(found.role);

    const welcomeMsgs = {
      donor: t('donorWelcomeMsg'),
      ngo: t('ngoWelcomeMsg'),
      volunteer: t('volunteerWelcomeMsg'),
      admin: t('adminWelcomeMsg')
    };

    showToast(`Welcome ${found.name}`, welcomeMsgs[found.role] || welcomeMsgs.donor, "success");
    return { success: true, user: found };
  };

  const registerUser = (userData) => {
    const nextId = `USR-${userData.role.toUpperCase()}-${String(users.length + 1).padStart(2, '0')}`;
    const newUser = {
      id: nextId,
      name: userData.name || userData.ngoName || "New Annsetu Partner",
      email: userData.email,
      phone: userData.phone || "",
      password: userData.password,
      role: userData.role,
      verificationStatus: userData.role === 'ngo' ? 'Pending' : 'Verified',
      address: userData.address || "",
      city: userData.city || "Vadodara",
      pincode: userData.pincode || "",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newUser, ...prev]);

    if (userData.role === 'ngo') {
      const newNgo = {
        id: `NGO-${ngos.length + 104}`,
        name: userData.ngoName,
        registrationNo: userData.regNo || `REG-2026-${Date.now().toString().slice(-6)}`,
        contactPerson: userData.contactPersonName || userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        city: userData.city || "Vadodara",
        pincode: userData.pincode,
        type: "Community Food Relief",
        areasServed: "Vadodara Metropolitan",
        peopleServedPerDay: 100,
        availableCapacity: "200 meals/day",
        verificationStatus: "Pending",
        badge: "Under Verification",
        avatar: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=150&auto=format&fit=crop&q=80"
      };
      setNgos(prev => [...prev, newNgo]);
      showToast("NGO Registration Submitted", t('ngoSubmittedMsg'), "info");
      return { success: true, user: newUser, isPendingNgo: true };
    } else {
      setCurrentUser(newUser);
      setRole(newUser.role);
      showToast("Account Created! 🎉", `Welcome to Annsetu, ${newUser.name}!`, "success");
      return { success: true, user: newUser };
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setRole('donor');
    showToast("Logged Out", "You have been logged out successfully.", "info");
  };

  const updateUserProfile = (updatedFields) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...updatedFields };
    setCurrentUser(updatedUser);
    
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));

    try {
      supabase.from('users').update(updatedFields).eq('id', currentUser.id).then(({ error }) => {
        if (error) console.log('Supabase profile sync info:', error.message);
      });
    } catch (e) {
      console.log('Local profile updated');
    }

    showToast("Profile Updated! ✨", "Profile updated successfully.", "success");
  };

  const updatePassword = (identifier, newPassword) => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/[^0-9]/g, '');

    const foundIdx = users.findIndex(u => 
      u.email.toLowerCase() === cleanId ||
      (u.adminId && u.adminId.toLowerCase() === cleanId) ||
      (u.phone && cleanPhone.length > 5 && u.phone.replace(/[^0-9]/g, '').includes(cleanPhone))
    );

    if (foundIdx === -1) {
      return { success: true, message: t('passwordResetSuccessMsg') };
    }

    setUsers(prev => {
      const updated = [...prev];
      updated[foundIdx] = { ...updated[foundIdx], password: newPassword };
      return updated;
    });

    return { success: true, message: t('passwordResetSuccessMsg') };
  };

  // Certificate Management & Generation
  const generateCertificate = (level) => {
    if (!currentUser) return { success: false, error: "Please log in." };

    const certCode = `ANN-${currentUser.role.toUpperCase().slice(0, 3)}-2026-${String(Date.now()).slice(-6)}`;
    
    // Check duplicate level
    const existing = certificates.find(c => c.userId === currentUser.id && c.level === level && c.status === 'Valid');
    if (existing) {
      return { success: true, certificate: existing, isExisting: true };
    }

    const newCert = {
      id: certCode,
      userId: currentUser.id,
      userName: currentUser.name,
      role: currentUser.role,
      level: level,
      verifiedServices: getServicesCountForUser(currentUser.id),
      impactPoints: getServicesCountForUser(currentUser.id) * 10,
      issuedAt: new Date().toISOString().split('T')[0],
      verificationCode: certCode,
      status: "Valid"
    };

    setCertificates(prev => [newCert, ...prev]);
    showToast("Certificate Generated! 🏆", `AnnSetu ${level} Social Impact Certificate unlocked.`, "success");
    return { success: true, certificate: newCert };
  };

  const revokeCertificate = (certId) => {
    setCertificates(prev => prev.map(c => c.id === certId ? { ...c, status: 'Revoked' } : c));
    showToast("Certificate Revoked ⚠️", `Certificate ${certId} has been revoked by Admin.`, "warning");
  };

  const getServicesCountForUser = (userId) => {
    if (!userId) return 12;
    const deliveredCount = donations.filter(d => d.status === 'Delivered').length;
    return deliveredCount > 0 ? deliveredCount * 4 + 8 : 12;
  };

  // Trigger floating Toast Notification Popup
  const showToast = (title, message, type = 'info') => {
    const toast = { id: Date.now(), title, message, type };
    setActiveToast(toast);

    setTimeout(() => {
      setActiveToast((prev) => (prev?.id === toast.id ? null : prev));
    }, 4500);
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: "Just now",
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(title, message, type);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Register New Donation (Donor)
  const registerDonation = (formData) => {
    const nextSeq = donations.length + 125;
    const newId = `ANS-2026-${String(nextSeq).padStart(6, '0')}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const targetNgo = ngos.find(n => n.id === formData.ngoId) || ngos[0];

    const newDonation = {
      id: newId,
      donorName: formData.donorName || currentUser?.name || "Community Partner",
      donorType: formData.donorType || "Restaurant",
      foodName: formData.foodName,
      foodCategory: formData.foodCategory || "Prepared Cooked Food",
      quantity: formData.quantity || "10",
      servingCapacity: parseInt(formData.servingCapacity) || 20,
      prepDate: formData.prepDate || new Date().toISOString().split('T')[0],
      prepTime: formData.prepTime || "18:30",
      foodTiming: formData.foodTiming || "evening",
      pickupDate: formData.pickupDate || formData.prepDate || new Date().toISOString().split('T')[0],
      pickupTime: formData.pickupTime || "19:15",
      foodPreference: formData.foodPreference || "Veg",
      storageInfo: formData.storageInfo || "Insulated Thermal Containers",
      foodCondition: formData.foodCondition || "Freshly prepared surplus, kept under insulation",
      foodQuality: formData.foodQuality || "Fresh",
      pickupAddress: formData.pickupAddress,
      city: formData.city || "Vadodara",
      pincode: formData.pincode || "390001",
      contactPerson: formData.contactPerson || currentUser?.name || formData.donorName,
      phone: formData.phone || currentUser?.phone || "+91 98000 00000",
      specialInstructions: formData.specialInstructions || "Handle with care",
      safetyConfirmed: formData.safetyConfirmed,
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
      status: "Pending",
      ngoId: targetNgo.id,
      ngoName: targetNgo.name,
      deliveryDriver: {
        name: "Pending Assignment",
        phone: "--",
        vehicleNo: "--",
        currentLocation: "Awaiting pickup assignment"
      },
      createdAt: nowStr,
      is_test_record: false,
      timeline: [
        { status: "Donation Registered", timestamp: nowStr, detail: `Registered by ${formData.donorName}`, completed: true },
        { status: "NGO Request Sent", timestamp: nowStr, detail: `Sent to ${targetNgo.name}`, completed: true },
        { status: "NGO Accepted", timestamp: "--", detail: "Awaiting NGO evaluation", completed: false },
        { status: "Pickup Assigned", timestamp: "--", detail: "Pending", completed: false },
        { status: "Food Picked Up", timestamp: "--", detail: "Pending", completed: false },
        { status: "In Transit", timestamp: "--", detail: "Pending", completed: false },
        { status: "Delivered", timestamp: "--", detail: "Pending", completed: false }
      ],
      rejectionReason: ""
    };

    // Async push to Supabase Database
    try {
      supabase.from('donations').insert([newDonation]).then(({ error }) => {
        if (error) console.log('Supabase sync info:', error.message);
      });
    } catch (e) {
      console.log('Supabase local sync');
    }

    setDonations([newDonation, ...donations]);
    addNotification("Donation Registered! ❤️", `Donation ${newId} (${formData.foodName}) registered successfully! Sent to ${targetNgo.name}.`, "success");
    return newId;
  };

  const evaluateDonation = (donationId, action, reason = "") => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        if (action === 'accept') {
          const updatedTimeline = item.timeline.map(t => {
            if (t.status === "NGO Accepted") return { ...t, timestamp: nowStr, completed: true, detail: `Accepted by ${item.ngoName}` };
            if (t.status === "Pickup Assigned") return { ...t, timestamp: nowStr, completed: true, detail: `Assigned to Ramesh Kumar (EV Partner)` };
            return t;
          });
          return {
            ...item,
            status: "Accepted",
            deliveryDriver: {
              name: "Ramesh Kumar (Volunteers)",
              phone: "+91 91066 33221",
              vehicleNo: "GJ-06-EV-4412",
              currentLocation: "Assigned & Route planned"
            },
            timeline: updatedTimeline
          };
        } else {
          return {
            ...item,
            status: "Rejected",
            rejectionReason: reason || "Quality or capacity constraints"
          };
        }
      }
      return item;
    }));

    if (action === 'accept') {
      addNotification("Donation Accepted 🤝", `Donation ${donationId} was accepted by NGO! Pickup volunteer assigned.`, "success");
    } else {
      addNotification("Donation Declined", `Donation ${donationId} was declined by NGO. Reason: ${reason}`, "warning");
    }
  };

  const updateDeliveryStatus = (donationId, newStatus, proofData = null) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        let updatedTimeline = item.timeline.map(t => {
          if (newStatus === "Picked Up" && t.status === "Food Picked Up") return { ...t, timestamp: nowStr, completed: true, detail: "Collected by driver" };
          if (newStatus === "In Transit" && (t.status === "Food Picked Up" || t.status === "In Transit")) return { ...t, timestamp: nowStr, completed: true, detail: "En route on map" };
          if (newStatus === "Delivered") {
            return { ...t, timestamp: nowStr, completed: true };
          }
          return t;
        });

        const updatedDriver = { ...item.deliveryDriver };
        if (newStatus === "Picked Up") updatedDriver.currentLocation = "Picked up from donor location";
        if (newStatus === "In Transit") updatedDriver.currentLocation = "In transit to NGO shelter";
        if (newStatus === "Delivered") updatedDriver.currentLocation = "Delivered to target NGO";

        return {
          ...item,
          status: newStatus,
          deliveryDriver: updatedDriver,
          timeline: updatedTimeline,
          deliveryProof: proofData || item.deliveryProof || null
        };
      }
      return item;
    }));

    if (newStatus === "Delivered") {
      addNotification("Food Delivered! ❤️", `Donation ${donationId} has safely reached its destination! Impact receipt generated.`, "success");
    } else {
      addNotification("Delivery Status Updated 🚚", `Donation ${donationId} status changed to ${newStatus}.`, "info");
    }
  };

  const verifyNgo = (ngoId, status) => {
    setNgos(prev => prev.map(n => n.id === ngoId ? { ...n, verificationStatus: status, badge: status === 'Verified' ? 'Verified NGO Badge' : 'Not Verified' } : n));
    addNotification("NGO Verification Updated", `NGO ${ngoId} verification status set to ${status}.`, "info");
  };

  // Real Database Impact Aggregations
  const verifiedDeliveredDonations = donations.filter(d => d.status === 'Delivered' && !d.is_test_record);

  const realImpactStats = {
    totalSuccessfulDonations: verifiedDeliveredDonations.length,
    totalCompletedDeliveries: verifiedDeliveredDonations.filter(d => d.deliveryDriver && d.deliveryDriver.name !== '--').length,
    totalServingsHelped: verifiedDeliveredDonations.reduce((sum, d) => sum + (parseInt(d.servingCapacity) || 0), 0),
    totalFoodKg: verifiedDeliveredDonations.reduce((sum, d) => sum + (parseFloat(d.quantity) || 0), 0),
    verifiedNgosCount: ngos.filter(n => n.verificationStatus === 'Verified').length,
    activeDonorsCount: users.filter(u => u.role === 'donor').length,
    activeVolunteersCount: users.filter(u => u.role === 'volunteer').length
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
        users,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        updatePassword,
        role,
        setRole,
        donations,
        ngos,
        ngoRequests,
        requestContributions,
        createNgoRequirement,
        fulfillNgoRequirement,
        cancelNgoRequirement,
        getAdminAnalytics,
        calculatePriorityScore,
        certificates,
        generateCertificate,
        revokeCertificate,
        getServicesCountForUser,
        notifications,
        markNotificationsRead,
        registerDonation,
        evaluateDonation,
        updateDeliveryStatus,
        verifyNgo,
        realImpactStats,
        selectedReceiptDonation,
        setSelectedReceiptDonation,
        activeToast,
        showToast,
        dismissToast,
        isRealtimeActive
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
export default AppContext;
