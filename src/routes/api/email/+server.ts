import nodemailer from 'nodemailer';
import { redirect, error, json } from '@sveltejs/kit';
import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS } from '$env/static/private';
import { signatureImage } from '$lib/email/molly-email-signature-for-nodemailer';
import { insertEmailWithTemplate } from '$lib/email/email-template.js';

