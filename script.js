const form = document.getElementById('workout-form');
const resultSection = document.getElementById('result');
const resultOutput = document.getElementById('plan-output');

function createWorkoutPlan(goal, activityLevel) {
  const plans = {
    'General Fitness': [
      'Day 1: Full-body circuit — squats, lunges, push-ups, rows',
      'Day 2: Cardio walk or brisk cycling for 30 minutes',
      'Day 3: Core day — planks, dead bugs, bird dogs',
      'Day 4: Recovery + mobility — stretch and easy movement',
      'Day 5: Strength focus — presses, pulls, and bodyweight work',
      'Day 6: Interval training — short sprints or fast cycling',
      'Day 7: Active recovery — walk, stretch, and hydration focus'
    ],
    Strength: [
      'Day 1: Upper body strength — push-ups, rows, overhead press',
      'Day 2: Lower body strength — squats, lunges, deadlifts',
      'Day 3: Rest or light mobility',
      'Day 4: Upper body strength — pull-ups, bench press, shoulder work',
      'Day 5: Lower body strength — Romanian deadlifts, step-ups, glutes',
      'Day 6: Core and stability — planks, carries, anti-rotation work',
      'Day 7: Recovery walk and stretching'
    ],
    Flexibility: [
      'Day 1: Mobility session — hips, spine, and shoulders',
      'Day 2: Gentle yoga and stretch flow',
      'Day 3: Recovery walk with deep breathing',
      'Day 4: Hamstring and lower-back mobility work',
      'Day 5: Standing stretches and posture exercises',
      'Day 6: Full-body mobility flow and balance work',
      'Day 7: Recovery + light stretching'
    ],
    Endurance: [
      'Day 1: Brisk walk or bike ride for 30–40 minutes',
      'Day 2: Interval training — 1 minute fast, 2 minutes easy',
      'Day 3: Recovery day with easy walking and mobility',
      'Day 4: Steady cardio session for 35–45 minutes',
      'Day 5: Hill walk or inclined cardio',
      'Day 6: Circuit of jumping jacks, squats, and mountain climbers',
      'Day 7: Light active recovery and stretching'
    ],
    'Healthy Lifestyle': [
      'Day 1: 20-minute walk + bodyweight circuit',
      'Day 2: Strength and balance work with short mobility routine',
      'Day 3: Light cardio and hydration focus',
      'Day 4: Core and posture exercises',
      'Day 5: Active recovery walk + stretching',
      'Day 6: Full-body movement and light resistance training',
      'Day 7: Rest day with recovery and meal planning'
    ]
  };

  const basePlan = plans[goal] || plans['General Fitness'];

  if (activityLevel === 'Beginner') {
    return basePlan.map((item) => item.replace(/\d+\s*[-–]*/g, '').trim());
  }

  if (activityLevel === 'Active') {
    return basePlan.map((item) => item + ' (increase intensity if energy allows)');
  }

  return basePlan;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get('name') || 'Friend';
  const age = formData.get('age') || 'N/A';
  const gender = formData.get('gender') || 'Not specified';
  const goal = formData.get('fitness_goal') || 'General Fitness';
  const activityLevel = formData.get('activity_level') || 'Beginner';
  const weight = formData.get('weight') || 'Not provided';

  const plan = createWorkoutPlan(goal, activityLevel);

  resultOutput.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Goal:</strong> ${goal}</p>
    <p><strong>Activity Level:</strong> ${activityLevel}</p>
    <p><strong>Weight:</strong> ${weight}</p>
    <ul>
      ${plan.map((day) => `<li>${day}</li>`).join('')}
    </ul>
  `;

  resultSection.classList.remove('hidden');
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
