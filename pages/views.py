from django.shortcuts import render
from gallery.models import Artwork
from .models import Exhibition


def home(request):
    """Home page with featured artworks and current exhibition."""
    featured_artworks = Artwork.objects.filter(
        is_featured=True, 
        is_available=True
    ).select_related('artist')[:4]
    
    current_exhibition = Exhibition.objects.filter(is_current=True).first()
    
    # Use the first featured artwork's image for hero, or fallback
    hero_image = None
    if featured_artworks:
        hero_image = featured_artworks[0].image
    
    context = {
        'featured_artworks': featured_artworks,
        'current_exhibition': current_exhibition,
        'hero_image': hero_image,
    }
    return render(request, 'pages/home.html', context)


def about(request):
    """About page with artist info and contact."""
    from gallery.models import Artist
    artist = Artist.objects.first()
    
    context = {
        'artist': artist,
    }
    return render(request, 'pages/about.html', context)


def exhibitions(request):
    """Exhibitions listing page."""
    current_exhibitions = Exhibition.objects.filter(is_current=True)
    upcoming_exhibitions = Exhibition.objects.filter(is_upcoming=True)
    past_exhibitions = Exhibition.objects.filter(is_current=False, is_upcoming=False)
    
    context = {
        'current_exhibitions': current_exhibitions,
        'upcoming_exhibitions': upcoming_exhibitions,
        'past_exhibitions': past_exhibitions,
    }
    return render(request, 'pages/exhibitions.html', context)


def exhibition_detail(request, slug):
    """Exhibition detail page."""
    from django.shortcuts import get_object_or_404
    exhibition = get_object_or_404(Exhibition, slug=slug)
    
    context = {
        'exhibition': exhibition,
    }
    return render(request, 'pages/exhibition_detail.html', context)
