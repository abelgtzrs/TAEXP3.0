// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// Import authentication middleware
const { protect, authorize } = require("./middleware/authMiddleware");
// Register models to ensure they are available for routes
require("./models/User");
require("./models/PokemonBase");
require("./models/SnoopyArtBase");
require("./models/BadgeBase");
require("./models/TitleBase");
require("./models/HabboRareBase");
require("./models/YugiohCardBase");
require("./models/AbelPersonaBase");
require("./models/ExerciseDefinition");
require("./models/userSpecific/userPokemon");
require("./models/userSpecific/userSnoopyArt");
require("./models/userSpecific/userBadge");
require("./models/userSpecific/userTitle");
require("./models/userSpecific/userHabboRare");
require("./models/userSpecific/userYugiohCard");

// Load environment variables and connect to the database
dotenv.config();
const app = express();
connectDB();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false }));

// Define GET route for the root URL
app.get("/", (req, res) => {
  res.send("The Abel Experience™ API is running...");
});

//Define API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/habits", require("./routes/habitRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/exercises", require("./routes/exerciseDefinitionRoutes"));
app.use("/api/workouts", require("./routes/workoutLogRoutes"));
app.use("/api/shop", require("./routes/shopRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin/volumes", require("./routes/volumeRoutes"));
app.use("/api/public", require("./routes/publicRoutes"));
app.use("/api/admin/workout-templates", require("./routes/workoutTemplateRoutes"));
app.use("/api/workout-templates", require("./routes/workoutTemplateRoutes"));
app.use("/api/admin/exercises", protect, authorize("admin"), require("./routes/exerciseAdminRoutes"));
app.use("/api/pokemon", require("./routes/pokemonRoutes"));
app.use("/api/admin/pokemon", protect, authorize("admin"), require("./routes/pokemonAdminRoutes"));
app.use("/api/badges", require("./routes/badgeRoutes"));
app.use("/api/spotify", require("./routes/spotifyRoutes"));
//app.use('/api/users', require('./routes/userRoutes'));
//app.use('/api/volumes', require('./routes/volumeRoutes'));

// Define PORT and initiate the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Welcome to the T43XP API!
The Abel Experience™ API is now operational.
Temporal Sync Initialized @ ${new Date().toLocaleTimeString()}
Listening on http://localhost:${PORT}
`);
});
