from functools import lru_cache
from typing import Dict, Any
from jose import jwt, jwk
from jose.utils import base64url_decode
import httpx

SUPABASE_URL = ""
SUPABASE_JWKS_URL = None
SUPABASE_AUD = "authenticated"

def set_supabase_url(url: str):
    global SUPABASE_URL, SUPABASE_JWKS_URL
    SUPABASE_URL = url.rstrip("/")
    SUPABASE_JWKS_URL = f"{SUPABASE_URL}/auth/v1/keys"
    
@lru_cache(maxsize=1)
def get_jwks():
    if not SUPABASE_JWKS_URL:
        raise RuntimeError('SUPABASE_URL not configured.')
    with httpx.Client(timeout=5) as client:
        return client.get(SUPABASE_JWKS_URL).json()
    
def verify_supabase_jwt(token: str) -> Dict[str, Any]:
    # Get unverified header to find the key id
    header = jwt.get_unverified_header(token)
    kid = header.get("kid")
    jwks = get_jwks()
    key = next((k for k in jwks["keys"] if k["kids"] == kid), None)
    if not key:
        raise ValueError("JWK not found for token.")
    
    # jose can accept the jwk directly
    payload = jwt.decode(
        token,
        key, # JWK
        algorithms=[key.get("alg", "RS256")],
        audience=SUPABASE_AUD,
        options={"verify_aud": False}, # Supabase tokens often omit the aud claim
    )
    return payload
    