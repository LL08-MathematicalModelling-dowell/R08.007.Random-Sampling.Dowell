// #include <pybind11/pybind11.h>
// #include <pybind11/stl.h>
#include <vector>
#include <cmath>
#include <cstdlib>
#include <time.h>
#include <algorithm>
#include <iostream>
#include <random>
using namespace std;

float PI = 3.14;

// namespace py = pybind11;

// Function to check if a point falls inside or on the circumference of a circle
bool is_point_inside_circle(double px, double py, double cx, double cy, double radius)
{
    double distance_squared = (px - cx) * (px - cx) + (py - cy) * (py - cy); // calculate the distance between the point and the center of the circle
    double radius_squared = radius * radius;                                 // calculate the square of the radius of the circle
    if (distance_squared <= radius_squared)
    { // if the distance is less than or equal to the square of the radius, the point is inside or on the circumference of the circle
        return true;
    }
    else
    {
        return false;
    }
}

bool is_point_inside_canvas(double px, double py, int side)
{
    if (px >= -side / 2 && py >= -side / 2 && px <= side / 2 && py <= side / 2)
    {
        return true;
    }
    else
    {
        return false;
    }
}

struct PointVector
{
    int x, y;
};

std::vector<PointVector> FieldRP(int side, int selection, int choice, float value)
{

    int area = side * side;
    float radius;
    int N;
    if (choice == 0)
    {
        N = static_cast<int>(value);
        int area_of_circle = area / N;
        radius = sqrt(area_of_circle / PI);
    }
    else if (choice == 1)
    {
        radius = value;
        int area_of_circle = PI * radius * radius;
        N = round(area / area_of_circle);
    }
    else
    {
    }
    float diameter = 2 * radius;

    std::vector<PointVector> coordinates;

    if (selection == 1)
    {
        coordinates.push_back({0, 0});
    }
    if (selection == 2)
    {
        coordinates.push_back({-side / 2, side / 2});
    }
    if (selection == 3)
    {
        coordinates.push_back({-side / 2, 0});
    }
    if (selection == 4)
    {
        coordinates.push_back({-side / 2, -side / 2});
    }
    if (selection == 5)
    {
        coordinates.push_back({0, -side / 2});
    }
    if (selection == 6)
    {
        coordinates.push_back({side / 2, -side / 2});
    }
    if (selection == 7)
    {
        coordinates.push_back({side / 2, 0});
    }
    if (selection == 8)
    {
        coordinates.push_back({side / 2, side / 2});
    }
    if (selection == 9)
    {
        coordinates.push_back({0, side / 2});
    }

    int selectA = coordinates[0].x;
    int selectB = coordinates[0].y;

    srand(time(0));
    while (coordinates.size() < N)
    {
        // Use a random device to seed the random number generator
        std::random_device rd;
        std::mt19937 gen(rd());

        // Use a uniform distribution to select a random angle
        std::uniform_real_distribution<double> dis(0.0, 2.0 * M_PI);
        double theta = dis(gen);

        // Calculate the corresponding point on the circumference of the circle
        int x = selectA + diameter * cos(theta);
        int y = selectB + diameter * sin(theta);
        if ((is_point_inside_circle(x, y, selectA, selectB, radius) == false) && is_point_inside_canvas(x, y, side) == true)
        {

            coordinates.push_back({x, y});
            selectA = x;
            selectB = y;
        }
        else
        {
        }
    }

    return coordinates;
}

// int main()
// {
//     int a, b, c, d;
//     cin >> a >> b >> c >> d;
//     std:vector<PointVector> coordinates = FieldRP(a, b, c, d);
//     for (int k = 0; k < coordinates.size(); k++)
//     {
//         cout << "(" << coordinates[k].x << "," << coordinates[k].y << ")\n";
//     }
//     return 0;
// }