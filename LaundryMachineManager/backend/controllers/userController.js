const { supabaseServiceRole } = require("../supabaseClient");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  const { name, building, email, password } = req.body;

  if (!name || !building || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const { data: existingUser, error: existingError } = await supabaseServiceRole
      .from("userslivein")
      .select("uid")
      .eq("uemail", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const uid = uuidv4();

    // insert uid, bid, uname, uemail, upassword to userslivein
    const { data, error } = await supabaseServiceRole
      .from("userslivein")
      .insert([
        {
          uid,
          bid: building, 
          uname: name,
          uemail: email,
          upassword: password,
        },
      ]);

    if (error) {
      return res.status(400).json({ error: "Failed to register user.", details: error.message });
    }

    res.status(201).json({ message: "User registered successfully.", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error.", details: err.message });
  }
};

module.exports = { registerUser };
