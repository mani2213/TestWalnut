import type { WalnutContext } from './walnut';

/** @walnut_method
 * name: Generate Random Indian Name
 * description: Generate a random Indian name for ${gender} and store in $[randomName]
 * actionType: custom_generate_indian_name
 * context: shared
 * needsLocator: false
 * category: Data Processing
 */
export async function generateRandomIndianName(ctx: WalnutContext) {
  const gender = ctx.args[0].toLowerCase();  // args[0] = gender value (from ${gender})
  
  const maleFirstNames = [
    'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Arnav', 'Ayaan', 'Krishna', 'Ishaan',
    'Shaurya', 'Atharva', 'Advait', 'Pranav', 'Dhruv', 'Aryan', 'Kabir', 'Shivansh', 'Ritvik', 'Reyansh',
    'Rohan', 'Yash', 'Om', 'Dev', 'Raghav', 'Karan', 'Harsh', 'Rudra', 'Vedant', 'Krish'
  ];

  const femaleFirstNames = [
    'Aaradhya', 'Ananya', 'Diya', 'Aanya', 'Pari', 'Saanvi', 'Sara', 'Aadhya', 'Kiara', 'Navya',
    'Anaya', 'Myra', 'Anika', 'Ishita', 'Prisha', 'Avni', 'Shanaya', 'Riya', 'Siya', 'Aditi',
    'Kavya', 'Nisha', 'Pooja', 'Shreya', 'Tanvi', 'Neha', 'Rhea', 'Zara', 'Ira', 'Mira'
  ];

  const lastNames = [
    'Sharma', 'Verma', 'Kumar', 'Singh', 'Patel', 'Gupta', 'Reddy', 'Nair', 'Iyer', 'Menon',
    'Rao', 'Desai', 'Joshi', 'Agarwal', 'Agrawal', 'Mehta', 'Jain', 'Chopra', 'Shah', 'Pandey',
    'Mishra', 'Kapoor', 'Malhotra', 'Bansal', 'Sinha', 'Saxena', 'Bhatia', 'Khanna', 'Arora', 'Sethi'
  ];

  let firstNames: string[];
  if (gender === 'male' || gender === 'm') {
    firstNames = maleFirstNames;
  } else if (gender === 'female' || gender === 'f') {
    firstNames = femaleFirstNames;
  } else {
    // If gender is not specified or invalid, use both
    firstNames = [...maleFirstNames, ...femaleFirstNames];
  }

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;

  ctx.log(`Generated random Indian name (${gender}): ${fullName}`);
  ctx.setVariable(ctx.args[1], fullName);  // args[1] = "randomName" (from $[randomName])
}
