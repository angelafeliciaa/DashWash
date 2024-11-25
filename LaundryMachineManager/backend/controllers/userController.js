const { supabaseServiceRole } = require("../supabaseClient");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  const { building, name, email, password } = req.body;

  console.log("Received registration data:", building, name, email, password );

  if (!name || !building || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const { data: existingUser, error: existingError } = await supabaseServiceRole
      .from("userlivesin")
      .select("uid")
      .eq("uemail", email)
      .maybeSingle(); 

    if (existingError && existingError.code !== "PGRST116") { // "PGRST116" = no rows found
      console.error("Error checking existing user:", existingError);
      return res.status(500).json({ error: "Error checking existing user.", details: existingError.message });
    }

    if (existingUser) {
        return res.status(400).json({ error: "Email already in use." });
    }
  
    const uid = uuidv4();
    const cid = uuidv4();
    console.log("Generated UID:", uid);
    console.log("Generated CID:", cid);

    // insert uid, bid, uname, uemail, upassword to userslivein
    const { data: userData, error: userError } = await supabaseServiceRole
      .from("userlivesin")
      .insert([
        {
          uid: uid,
          bid: building, 
          uname: name,
          uemail: email,
          upassword: password,
        },
      ])
      .select("uid")
      .single();

      if (userError) {
        console.error("Insert Error:", userError);
        return res.status(400).json({ error: "Failed to register user.", details: userError.message });
      }

      // initialize washing card
      const { data: cardData, error: cardError } = await supabaseServiceRole
      .from("loadswashingcard")
      .insert([{ cid, uid, balance: 5 }])
      .select("cid")
      .single();

      if (cardError) {
        console.error("Washing Card Error:", cardError);
        return res.status(400).json({ error: "Failed to initialize washing card.", details: cardError.message });
      }

      res.status(201).json({ 
        message: "User registered successfully.", 
        uid: uid, 
        cid: cid 
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error.", details: err.message });
  }
};

module.exports = { registerUser };
