import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

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
    quantity: "15 kg (50 portions)",
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
    quantity: "35 kg (120 portions)",
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
    quantity: "8 kg (30 portions)",
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

// Initial mock registered users for local prototype testing
const INITIAL_USERS = [
  {
    id: "usr_donor_1",
    email: "donor@annsetu.org",
    name: "Green Leaf Fine Dining",
    phone: "+91 94280 99887",
    location: "Vadodara",
    role: "donor",
    accountStatus: "Verified"
  },
  {
    id: "usr_ngo_1",
    email: "ngo@annsetu.org",
    name: "Hope Foundation India",
    phone: "+91 98765 43210",
    location: "Vadodara",
    role: "ngo",
    accountStatus: "Verified"
  },
  {
    id: "usr_ngo_pending",
    email: "pending.ngo@annsetu.org",
    name: "Seva Community Kitchen",
    phone: "+91 99099 55443",
    location: "Vadodara",
    role: "ngo",
    accountStatus: "Pending"
  },
  {
    id: "usr_volunteer_1",
    email: "volunteer@annsetu.org",
    name: "Ramesh Kumar",
    phone: "+91 91066 33221",
    location: "Vadodara",
    role: "volunteer",
    accountStatus: "Verified"
  },
  {
    id: "usr_fund_1",
    email: "fund@annsetu.org",
    name: "Anand Patel",
    phone: "+91 98250 88776",
    location: "Vadodara",
    role: "fund_donor",
    accountStatus: "Verified"
  },
  {
    id: "usr_admin_1",
    email: "admin@annsetu.org",
    name: "AnnSetu Administrator",
    phone: "+91 90000 00000",
    location: "Vadodara",
    role: "admin",
    accountStatus: "Verified"
  }
];

export const AppProvider = ({ children }) => {
  // Language Persistence
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('annsetu_language') || 'en';
  });

  // Auth User & Role State Persistence
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('annsetu_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [role, setRoleState] = useState(() => {
    const saved = localStorage.getItem('annsetu_user');
    return saved ? JSON.parse(saved).role : 'donor';
  });

  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [ngos, setNgos] = useState(INITIAL_NGOS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selectedReceiptDonation, setSelectedReceiptDonation] = useState(null);
  const [activeToast, setActiveToast] = useState(null);
  const [isRealtimeActive, setIsRealtimeActive] = useState(true);

  // Sync document element lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('annsetu_language', language);
  }, [language]);

  // Persist User & Role State
  useEffect(() => {
    if (user) {
      localStorage.setItem('annsetu_user', JSON.stringify(user));
      setRoleState(user.role);
    } else {
      localStorage.removeItem('annsetu_user');
    }
  }, [user]);

  // SUPABASE REAL-TIME & AUTH LISTENER
  useEffect(() => {
    let channel;
    try {
      channel = supabase
        .channel('public:donations')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, (payload) => {
          if (payload.eventType === 'INSERT') {
            setDonations(prev => [payload.new, ...prev]);
            addNotification("Real-Time Donation Added! 🍱", `New donation ${payload.new.id} received via Supabase.`, "success");
          } else if (payload.eventType === 'UPDATE') {
            setDonations(prev => prev.map(item => item.id === payload.new.id ? { ...item, ...payload.new } : item));
            addNotification("Real-Time Status Update ⚡", `Donation ${payload.new.id} updated to ${payload.new.status}.`, "info");
          }
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') setIsRealtimeActive(true);
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

  // Toast Notification Popup
  const showToast = (title, message, type = 'info') => {
    const toast = { id: Date.now(), title, message, type };
    setActiveToast(toast);
    setTimeout(() => {
      setActiveToast((prev) => (prev?.id === toast.id ? null : prev));
    }, 4500);
  };

  const dismissToast = () => setActiveToast(null);

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

  // --- AUTHENTICATION & PROFILE METHODS ---
  const registerUser = async (userData) => {
    // Attempt Supabase Auth Sign-Up if configured
    let authId = `usr_${Date.now()}`;
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
            phone: userData.phone,
            location: userData.location
          }
        }
      });
      if (data?.user?.id) authId = data.user.id;
    } catch (err) {
      console.log('Supabase auth fallback active:', err.message);
    }

    const newUser = {
      id: authId,
      email: userData.email,
      name: userData.name || userData.email.split('@')[0],
      phone: userData.phone || "+91 98000 00000",
      location: userData.location || "Vadodara",
      role: userData.role,
      accountStatus: userData.role === 'ngo' ? 'Pending' : 'Verified',
      createdAt: new Date().toISOString()
    };

    setUsersList(prev => [newUser, ...prev]);
    setUser(newUser);

    if (userData.role === 'ngo') {
      // Create pending NGO partner entry
      registerNgo({
        name: userData.ngoName || userData.name,
        registrationNo: userData.regNo || "REG-PENDING",
        contactPerson: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address || userData.location,
        city: userData.location,
        pincode: userData.pincode || "390001",
        type: userData.beneficiaryType || "Community Food Relief",
        availableCapacity: userData.capacity || "200 meals/day"
      });
      showToast("NGO Registration Submitted 🏢", "Your NGO application is pending Admin verification.", "warning");
    } else {
      showToast("Registration Successful 🎉", `Welcome to AnnSetu, ${newUser.name}!`, "success");
    }

    return newUser;
  };

  const loginUser = async (email, password) => {
    // Attempt Supabase Login
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (data?.user) {
        const foundSupabaseUser = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email.split('@')[0],
          phone: data.user.user_metadata?.phone || "+91 98000 00000",
          location: data.user.user_metadata?.location || "Vadodara",
          role: data.user.user_metadata?.role || "donor",
          accountStatus: data.user.user_metadata?.accountStatus || "Verified"
        };
        setUser(foundSupabaseUser);
        showToast("Login Successful 🔓", `Welcome back, ${foundSupabaseUser.name}!`, "success");
        return foundSupabaseUser;
      }
    } catch (err) {
      console.log('Supabase login local fallback active');
    }

    // Local Fallback Login Check
    const foundLocal = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundLocal) {
      setUser(foundLocal);
      showToast("Login Successful 🔓", `Welcome back, ${foundLocal.name}!`, "success");
      return foundLocal;
    }

    // Demo Mode Auto-Create Account if new email logged in
    const defaultRole = email.includes('admin') ? 'admin' :
                        email.includes('ngo') ? 'ngo' :
                        email.includes('volunteer') ? 'volunteer' :
                        email.includes('fund') ? 'fund_donor' : 'donor';

    const mockUser = {
      id: `usr_${Date.now()}`,
      email,
      name: email.split('@')[0].toUpperCase(),
      phone: "+91 98000 00000",
      location: "Vadodara",
      role: defaultRole,
      accountStatus: "Verified"
    };

    setUsersList(prev => [mockUser, ...prev]);
    setUser(mockUser);
    showToast("Login Successful 🔓", `Welcome back to AnnSetu!`, "success");
    return mockUser;
  };

  const logoutUser = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setUser(null);
    localStorage.removeItem('annsetu_user');
    showToast("Logged Out", "You have been safely logged out.", "info");
  };

  // Register New Donation (Donor)
  const registerDonation = (formData) => {
    const nextSeq = donations.length + 125;
    const newId = `ANS-2026-${String(nextSeq).padStart(6, '0')}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const targetNgo = ngos.find(n => n.id === formData.ngoId) || ngos[0];

    const newDonation = {
      id: newId,
      donorName: formData.donorName || user?.name || "Community Partner",
      donorType: formData.donorType || "Restaurant",
      foodName: formData.foodName,
      foodCategory: formData.foodCategory || "Prepared Meal",
      quantity: formData.quantity,
      servingCapacity: parseInt(formData.servingCapacity) || 20,
      prepDate: formData.prepDate || new Date().toISOString().split('T')[0],
      prepTime: formData.prepTime || "20:00",
      foodCondition: formData.foodCondition || "Safe surplus meal",
      foodQuality: formData.foodQuality || "Fresh",
      pickupAddress: formData.pickupAddress,
      city: formData.city || "Vadodara",
      pincode: formData.pincode || "390001",
      contactPerson: formData.contactPerson || formData.donorName,
      phone: formData.phone || "+91 98000 00000",
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

    try {
      supabase.from('donations').insert([newDonation]).then(({ error }) => {
        if (error) console.log('Supabase sync info:', error.message);
      });
    } catch (e) {}

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
          if (newStatus === "Delivered") return { ...t, timestamp: nowStr, completed: true };
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
    setUsersList(prev => prev.map(u => u.id === ngoId || u.name === ngoId ? { ...u, accountStatus: status } : u));
    addNotification("NGO Verification Updated", `NGO ${ngoId} verification status set to ${status}.`, "info");
  };

  const registerNgo = (ngoData) => {
    const newId = `NGO-${ngos.length + 104}`;
    const newNgo = {
      id: newId,
      name: ngoData.name,
      registrationNo: ngoData.registrationNo,
      contactPerson: ngoData.contactPerson,
      email: ngoData.email,
      phone: ngoData.phone,
      address: ngoData.address,
      city: ngoData.city || "Vadodara",
      pincode: ngoData.pincode,
      type: ngoData.type || "Community Food Relief",
      areasServed: ngoData.areasServed || "Vadodara Metropolitan",
      peopleServedPerDay: parseInt(ngoData.peopleServedPerDay) || 100,
      availableCapacity: `${ngoData.availableCapacity || 200} meals/day`,
      verificationStatus: "Pending",
      badge: "Under Verification",
      avatar: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=150&auto=format&fit=crop&q=80"
    };
    setNgos([...ngos, newNgo]);
    addNotification("NGO Registration Received", `NGO ${ngoData.name} registered and pending Admin verification.`, "success");
  };

  const stats = {
    totalDonations: donations.length,
    totalMeals: donations.reduce((acc, curr) => acc + (curr.status === 'Delivered' || curr.status === 'In Transit' || curr.status === 'Accepted' ? curr.servingCapacity : 0), 10430),
    peopleServed: donations.reduce((acc, curr) => acc + (curr.status === 'Delivered' ? curr.servingCapacity : 0), 2500),
    activeNGOs: ngos.filter(n => n.verificationStatus === 'Verified').length,
    activeDonors: 120,
    completedDeliveries: donations.filter(d => d.status === 'Delivered').length + 7920,
    pendingDonations: donations.filter(d => d.status === 'Pending' || d.status === 'Accepted').length
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
        user,
        role: user ? user.role : role,
        setRole: (r) => {
          setRoleState(r);
          if (user) setUser({ ...user, role: r });
          showToast("Active Role Switched", `Switched portal role to ${r.toUpperCase()}.`, "info");
        },
        registerUser,
        loginUser,
        logoutUser,
        usersList,
        donations,
        ngos,
        notifications,
        markNotificationsRead,
        registerDonation,
        evaluateDonation,
        updateDeliveryStatus,
        verifyNgo,
        registerNgo,
        stats,
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
