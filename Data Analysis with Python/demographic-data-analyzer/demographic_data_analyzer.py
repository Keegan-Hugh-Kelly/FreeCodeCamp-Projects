import pandas as pd

def calculate_demographic_data(print_data=True):
    # Load the dataset
    df = pd.read_csv('adult.data.csv', header=None, names=[
        'age', 'workclass', 'fnlwgt', 'education', 'education-num',
        'marital-status', 'occupation', 'relationship', 'race',
        'sex', 'capital-gain', 'capital-loss', 'hours-per-week',
        'native-country', 'salary'
    ])
    
    # Ensure 'age' is numeric
    df['age'] = pd.to_numeric(df['age'], errors='coerce')
    df = df.dropna(subset=['age'])

    # Question 1: Race count
    race_count = df['race'].value_counts()

    # Question 2: Average age of men
    average_age_men = round(df[df['sex'] == 'Male']['age'].mean(), 1)

    # Question 3: Percentage with Bachelor's degree
    total_people = len(df)
    total_bachelors = len(df[df['education'] == 'Bachelors'])
    percentage_bachelors = round((total_bachelors / total_people) * 100, 1)

    # Question 4: Percentage of people with advanced education earning >50K
    advanced_education = df[df['education'].isin(['Bachelors', 'Masters', 'Doctorate'])]
    percentage_advanced_edu_50k = round((len(advanced_education[advanced_education['salary'] == '>50K']) / len(advanced_education)) * 100, 1)

    # Question 5: Percentage of people without advanced education earning >50K
    non_advanced_education = df[~df['education'].isin(['Bachelors', 'Masters', 'Doctorate'])]
    percentage_non_advanced_edu_50k = round((len(non_advanced_education[non_advanced_education['salary'] == '>50K']) / len(non_advanced_education)) * 100, 1)

    # Question 6: Minimum hours worked per week
    min_hours_worked = df['hours-per-week'].min()

    # Question 7: Percentage of people working min hours earning >50K
    min_hours_workers = df[df['hours-per-week'] == min_hours_worked]
    percentage_min_hours_50k = round((len(min_hours_workers[min_hours_workers['salary'] == '>50K']) / len(min_hours_workers)) * 100, 1)

    # Question 8: Country with the highest percentage of >50K earners
    country_salary = df[df['salary'] == '>50K']['native-country'].value_counts()
    country_total = df['native-country'].value_counts()
    country_percentage = (country_salary / country_total) * 100
    highest_earning_country = country_percentage.idxmax()
    highest_earning_country_percentage = round(country_percentage.max(), 1)

    # Question 9: Most popular occupation for >50K earners in India
    india_high_earners = df[(df['native-country'] == 'India') & (df['salary'] == '>50K')]
    top_india_occupation = india_high_earners['occupation'].mode()[0]

    # Print the results if required
    if print_data:
        print("Number of each race:\n", race_count)
        print("Average age of men:", average_age_men)
        print(f"Percentage with Bachelors degrees: {percentage_bachelors}%")
        print(f"Percentage with advanced education making >50K: {percentage_advanced_edu_50k}%")
        print(f"Percentage without advanced education making >50K: {percentage_non_advanced_edu_50k}%")
        print(f"Minimum number of hours worked per week: {min_hours_worked}")
        print(f"Percentage of people working minimum hours earning >50K: {percentage_min_hours_50k}%")
        print(f"Country with highest percentage of >50K earners: {highest_earning_country} ({highest_earning_country_percentage}%)")
        print(f"Top occupations in India for those earning >50K: {top_india_occupation}")

    # Return the results for testing
    return {
        'race_count': race_count,
        'average_age_men': average_age_men,
        'percentage_bachelors': percentage_bachelors,
        'percentage_advanced_edu_50k': percentage_advanced_edu_50k,
        'percentage_non_advanced_edu_50k': percentage_non_advanced_edu_50k,
        'min_hours_worked': min_hours_worked,
        'percentage_min_hours_50k': percentage_min_hours_50k,
        'highest_earning_country': highest_earning_country,
        'highest_earning_country_percentage': highest_earning_country_percentage,
        'top_india_occupation': top_india_occupation
    }

# Ensure the script runs when executed directly
if __name__ == "__main__":
    calculate_demographic_data(print_data=True)
