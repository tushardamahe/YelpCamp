const bcrypt = require("bcrypt");

// const hashPassword = async ( pw ) => {
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// };

const hashPassword = async ( pw ) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
};

const login = async(pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if(result) {
        console.log("Logged in!");
    } else {
        console.log("Incorrect Password!");
    }
}

// hashPassword("Tushar");

login("tushar","$2b$12$qZI3qqe3bAVekaKRrFqDm.sNVPsGhsloMf6TF/W8U/MfgnfdoPq4a");  