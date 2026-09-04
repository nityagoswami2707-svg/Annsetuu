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
    name: "Green Leaf Fine Dining",
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
    regNo: "REG-2021-987654",
    contactPerson: "Dr. Rajesh Sharma",
    verificationStatus: "Verified",
    city: "Vadodara",
    address: "Plot 45, Community Center, Alkapuri",
    pincode: "390007",
    createdAt: "2026-02-01"
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
    areasServed: "Akota, Tandalja, Old City",
    peopleServedPerDay: 200,
    availableCapacity: "250 meals/day",
    verificationStatus: "Pending",
    badge: "Under Verification",
    avatar: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=150&auto=format&fit=crop&q=80"
  }
];

const INITIAL_DONATIONS = [
  {
    id: "ANS-2026-000123",
    donorName: "Green Leaf Fine Dining",
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
      { status: "Donation Registered", timestamp: "2026-08-06 21:15", detail: "Registered by Green Leaf Fine Dining", completed: true },
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
    userName: "Green Leaf Fine Dining",
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
    message: "Green Leaf Fine Dining registered 50 meals (ANS-2026-000123). Driver Ramesh assigned.",
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
  const [certificates, setCertificates] = useState(INITIAL_CERTIFICATES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selectedReceiptDonation, setSelectedReceiptDonation] = useState(null);
  const [activeToast, setActiveToast] = useState(null);
  const [isRealtimeActive, setIsRealtimeActive] = useState(true);

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

    // Role check for non-admin target portal
    if (targetRole && found.role !== 'admin' && found.role !== targetRole) {
      return { success: false, error: `This account is registered as ${found.role.toUpperCase()}. Please login using the ${found.role.toUpperCase()} portal.` };
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
      foodCategory: formData.foodCategory || "Prepared Meal",
      quantity: formData.quantity || "10",
      servingCapacity: parseInt(formData.servingCapacity) || 20,
      prepDate: formData.prepDate || new Date().toISOString().split('T')[0],
      prepTime: formData.prepTime || "20:00",
      foodCondition: formData.foodCondition || "Safe surplus meal",
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

  const updateDeliveryStatus = (donationId, newStatus) => {
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
          timeline: updatedTimeline
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
        updatePassword,
        role,
        setRole,
        donations,
        ngos,
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
