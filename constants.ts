
import { UnitDefinition, UnitCategory } from './types';

export const CATEGORIES: UnitCategory[] = ['Length', 'Weight', 'Temperature', 'Volume', 'Area', 'Time', 'Smart'];

export const UNITS: Record<Exclude<UnitCategory, 'Smart'>, UnitDefinition[]> = {
  Length: [
    { id: 'm', name: 'Meter', factor: 1, symbol: 'm' },
    { id: 'km', name: 'Kilometer', factor: 1000, symbol: 'km' },
    { id: 'cm', name: 'Centimeter', factor: 0.01, symbol: 'cm' },
    { id: 'mm', name: 'Millimeter', factor: 0.001, symbol: 'mm' },
    { id: 'mi', name: 'Mile', factor: 1609.34, symbol: 'mi' },
    { id: 'yd', name: 'Yard', factor: 0.9144, symbol: 'yd' },
    { id: 'ft', name: 'Foot', factor: 0.3048, symbol: 'ft' },
    { id: 'in', name: 'Inch', factor: 0.0254, symbol: 'in' },
  ],
  Weight: [
    { id: 'kg', name: 'Kilogram', factor: 1, symbol: 'kg' },
    { id: 'g', name: 'Gram', factor: 0.001, symbol: 'g' },
    { id: 'mg', name: 'Milligram', factor: 0.000001, symbol: 'mg' },
    { id: 't', name: 'Metric Ton', factor: 1000, symbol: 't' },
    { id: 'lb', name: 'Pound', factor: 0.453592, symbol: 'lb' },
    { id: 'oz', name: 'Ounce', factor: 0.0283495, symbol: 'oz' },
  ],
  Temperature: [
    { id: 'c', name: 'Celsius', factor: 1, symbol: '°C' },
    { id: 'f', name: 'Fahrenheit', factor: 1, symbol: '°F' },
    { id: 'k', name: 'Kelvin', factor: 1, symbol: 'K' },
  ],
  Volume: [
    { id: 'l', name: 'Liter', factor: 1, symbol: 'L' },
    { id: 'ml', name: 'Milliliter', factor: 0.001, symbol: 'mL' },
    { id: 'gal', name: 'Gallon', factor: 3.78541, symbol: 'gal' },
    { id: 'qt', name: 'Quart', factor: 0.946353, symbol: 'qt' },
    { id: 'pt', name: 'Pint', factor: 0.473176, symbol: 'pt' },
    { id: 'cup', name: 'Cup', factor: 0.236588, symbol: 'cup' },
  ],
  Area: [
    { id: 'sqm', name: 'Square Meter', factor: 1, symbol: 'm²' },
    { id: 'sqkm', name: 'Square Kilometer', factor: 1000000, symbol: 'km²' },
    { id: 'sqmi', name: 'Square Mile', factor: 2589988, symbol: 'mi²' },
    { id: 'acre', name: 'Acre', factor: 4046.86, symbol: 'ac' },
    { id: 'hectare', name: 'Hectare', factor: 10000, symbol: 'ha' },
  ],
  Time: [
    { id: 's', name: 'Second', factor: 1, symbol: 's' },
    { id: 'min', name: 'Minute', factor: 60, symbol: 'min' },
    { id: 'hr', name: 'Hour', factor: 3600, symbol: 'hr' },
    { id: 'day', name: 'Day', factor: 86400, symbol: 'day' },
    { id: 'week', name: 'Week', factor: 604800, symbol: 'week' },
  ],
};
