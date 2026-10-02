import Country from '../models/Country.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

/* ---------------------------------------------------------
 * Public endpoints (existing)
 * ------------------------------------------------------- */

export const listCountries = asyncHandler(async (req, res) => {
  const { featured, q } = req.query;
  const filter = { isActive: true };
  if (featured === 'true') filter.isFeatured = true;
  if (q) filter.name = new RegExp(q.trim(), 'i');

  const items = await Country.find(filter).sort({ name: 1 });
  res.json({ success: true, data: items });
});

export const getCountryBySlug = asyncHandler(async (req, res) => {
  const country = await Country.findOne({ slug: req.params.slug, isActive: true });
  if (!country) throw new ApiError(404, 'Country not found');
  res.json({ success: true, data: country });
});

/* ---------------------------------------------------------
 * NEW — Proxy for REST Countries API
 * Bypasses browser CORS by fetching on the server side.
 * ------------------------------------------------------- */

export const proxyRestCountries = asyncHandler(async (req, res) => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flags,flag,region,subregion,capital,population,currencies,languages,timezones,idd,maps',
      {
        headers: {
          'User-Agent': 'GlobalPath-Visa-Consultancy/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `REST Countries API returned ${response.status}`
      );
    }

    const data = await response.json();
    res.json({ success: true, data });
  } catch (err) {
    console.error('❌ REST Countries proxy failed:', err.message);
    throw new ApiError(502, 'Could not fetch countries from external API');
  }
});

/* ---------------------------------------------------------
 * Admin endpoints (existing)
 * ------------------------------------------------------- */

export const createCountry = asyncHandler(async (req, res) => {
  const country = await Country.create(req.body);
  res.status(201).json({ success: true, data: country });
});

export const updateCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!country) throw new ApiError(404, 'Country not found');
  res.json({ success: true, data: country });
});

export const deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndDelete(req.params.id);
  if (!country) throw new ApiError(404, 'Country not found');
  res.json({ success: true, message: 'Deleted' });
});