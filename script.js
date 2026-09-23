const form = document.getElementById('workout-form');
const resultSection = document.getElementById('result');
const resultOutput = document.getElementById('plan-output');

function createWorkoutPlan(goal, activityLevel) {
  const basePlans = {
    'General Fitness': [
      'Day 1: 10 push-ups, 15 squats, 20-second plank',
      'Day 2: 12 lunges per leg, 15 bodyweight rows, 30-second march',
      'Day 3: 20-minute brisk walk or cycling',
      'Day 4: 10 dips, 15 glute bridges, 20-second side plank',
      'Day 5: 12 burpees, 15 jumping jacks, 20-second wall sit',
      'Day 6: 10 push-ups, 15 squats, 12 dead bugs each side',
      'Day 7: 20-minute walk, 10-minute mobility stretch'
    ],
    Strength: [
      'Day 1: 10 push-ups, 12 bent-over rows, 15 squats',
      'Day 2: 12 lunges per leg, 10 shoulder presses, 20-second plank',
      'Day 3: 10 deadlifts, 12 reverse lunges, 15 calf raises',
      'Day 4: 8 pull-ups or assisted pull-ups, 12 bench dips, 15 sit-ups',
      'Day 5: 12 goblet squats, 10 overhead presses, 15 glute bridges',
      'Day 6: 10 burpees, 12 rows, 15 squats',
      'Day 7: 20-minute walk + light stretching'
    ],
    Flexibility: [
      'Day 1: 10 yoga lunges, 20-second hamstring stretch, 10 cat-cow reps',
      'Day 2: 12 hip circles each side, 15 chest openers, 20-second child pose',
      'Day 3: 10 shoulder rolls, 20-second calf stretch, 10 deep breaths',
      'Day 4: 12 seated twists, 15 glute stretches, 20-second quad stretch',
      'Day 5: 10 downward dogs, 15 ankle circles, 20-second hamstring stretch',
      'Day 6: 10 yoga poses flow, 20-second hip flexor stretch',
      'Day 7: 15-minute gentle walk and mobility flow'
    ],
    Endurance: [
      'Day 1: 30-minute brisk walk or cycling',
      'Day 2: 10 rounds of 20 jumping jacks + 10 squats',
      'Day 3: 15-minute easy jog + 10-minute stretch',
      'Day 4: 20-minute steady cardio',
      'Day 5: 10 rounds of 10 mountain climbers + 15 lunges',
      'Day 6: 25-minute interval cardio',
      'Day 7: 20-minute light recovery walk'
    ],
    'Healthy Lifestyle': [
      'Day 1: 10 push-ups, 15 squats, 20-minute walk',
      'Day 2: 12 lunges, 20-second plank, easy stretching',
      'Day 3: 15-minute brisk walk, 10-bodyweight squats',
      'Day 4: 10 glute bridges, 15 sit-ups, mobility work',
      'Day 5: 20-minute walk, 12 jumping jacks rounds',
      'Day 6: 10 push-ups, 15 squats, light cardio',
      'Day 7: Recovery day: gentle walk and hydration'
    ]
  };

  let plan = basePlans[goal] || basePlans['General Fitness'];

  if (!Array.isArray(plan) || plan.length !== 7) {
    plan = basePlans['General Fitness'];
  }

  if (activityLevel === 'Beginner') {
    return plan.map((item) => item.replace(/(\d+)/g, (num) => Math.max(5, Math.floor(Number(num) * 0.7))));
  }

  if (activityLevel === 'Advanced') {
    return plan.map((item) => item.replace(/(\d+)/g, (num) => Math.ceil(Number(num) * 1.5)));
  }

  return plan;
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
      ${plan.map((day) => {
        const [label, ...rest] = day.split(':');
        return `<li><span class="day-label">${label}:</span> ${rest.join(':').trim()}</li>`;
      }).join('')}
    </ul>
  `;

  resultSection.classList.remove('hidden');
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
