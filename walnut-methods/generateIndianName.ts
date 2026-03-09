import type { WalnutContext } from './walnut';
import * as crypto from 'crypto';

/** @walnut_method
 * name: Generate Random Indian Name
 * description: Generate random Indian name with gender ${gender} and store in $[indianName]
 * actionType: custom_generate_indian_name
 * context: shared
 * needsLocator: false
 * category: Data Processing
 */
export async function generateIndianName(ctx: WalnutContext) {
  // ctx.args[0] = gender value from ${gender} (male/female/random)
  // ctx.args[1] = variable name "indianName" from $[indianName]
  
  const gender = (ctx.args[0] as string)?.toLowerCase() || 'random';
  const outputVar = ctx.args[1];
  
  const maleFirstNames = [
    'Aarav', 'Arjun', 'Aditya', 'Vivaan', 'Vihaan', 'Sai', 'Atharva', 'Reyansh',
    'Ayaan', 'Ishaan', 'Krishna', 'Dhruv', 'Arnav', 'Aayan', 'Shaurya',
    'Kabir', 'Advait', 'Ansh', 'Rudra', 'Harsh', 'Rohan', 'Aarush',
    'Pranav', 'Yash', 'Shivansh', 'Darsh', 'Advik', 'Om', 'Veer', 'Dev'
  ];
  
  const femaleFirstNames = [
    'Aadhya', 'Ananya', 'Anika', 'Avni', 'Diya', 'Ira', 'Ishita', 'Jhanvi',
    'Kavya', 'Kiara', 'Myra', 'Navya', 'Pari', 'Prisha', 'Riya', 'Sara',
    'Saanvi', 'Shanaya', 'Tara', 'Zara', 'Aarohi', 'Aditi', 'Anaya',
    'Avika', 'Drishti', 'Isha', 'Mira', 'Nisha', 'Pooja', 'Shreya'
  ];
  
  const lastNames = [
    'Sharma', 'Verma', 'Kumar', 'Singh', 'Patel', 'Gupta', 'Reddy', 'Shah',
    'Agarwal', 'Jain', 'Mehta', 'Nair', 'Iyer', 'Desai', 'Pillai', 'Rao',
    'Kulkarni', 'Mishra', 'Joshi', 'Bhat', 'Pandey', 'Chauhan', 'Malhotra',
    'Das', 'Banerjee', 'Chopra', 'Kapoor', 'Saxena', 'Trivedi', 'Menon'
  ];
  
  // Determine which gender to use
  let selectedGender = gender;
  if (gender === 'random' || (gender !== 'male' && gender !== 'female')) {
    selectedGender = getRandomInt(2) === 0 ? 'male' : 'female';
  }
  
  // Select random names
  const firstNameList = selectedGender === 'male' ? maleFirstNames : femaleFirstNames;
  const firstName = firstNameList[getRandomInt(firstNameList.length)];
  const lastName = lastNames[getRandomInt(lastNames.length)];
  
  const fullName = `${firstName} ${lastName}`;
  
  ctx.log(`Generated Indian name: ${fullName} (gender: ${selectedGender})`);
  ctx.setVariable(outputVar, fullName);
  
  // Helper function to generate cryptographically random integer
  function getRandomInt(max: number): number {
    const randomBuffer = crypto.randomBytes(4);
    const randomNumber = randomBuffer.readUInt32BE(0);
    return randomNumber % max;
  }
}
