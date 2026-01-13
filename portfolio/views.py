from django.shortcuts import render, get_object_or_404
from gallery.models import Artwork, Artist
from pages.models import Exhibition


def home(request):
    """Portfolio home with category menu - Helen Beard style."""
    # Get unique mediums with artwork counts for menu
    mediums = []
    for choice in Artwork.MEDIUM_CHOICES:
        code, label = choice
        artworks = Artwork.objects.filter(medium=code)
        if artworks.exists():
            mediums.append({
                'code': code,
                'label': label,
                'count': artworks.count(),
                'cover_image': artworks.first(),
            })
    
    return render(request, 'portfolio/home.html', {
        'mediums': mediums,
    })


def work_index(request):
    """Overview of work categories/mediums."""
    # Get unique mediums with artwork counts
    mediums = []
    for choice in Artwork.MEDIUM_CHOICES:
        code, label = choice
        artworks = Artwork.objects.filter(medium=code)
        if artworks.exists():
            mediums.append({
                'code': code,
                'label': label,
                'count': artworks.count(),
                'cover_image': artworks.first(),
            })
    
    return render(request, 'portfolio/work/index.html', {
        'mediums': mediums,
    })


def work_category(request, category):
    """Artworks filtered by medium/category."""
    # Find the label for the category
    category_label = dict(Artwork.MEDIUM_CHOICES).get(category, category.title())
    artworks = Artwork.objects.filter(medium=category)
    
    return render(request, 'portfolio/work/category.html', {
        'category': category,
        'category_label': category_label,
        'artworks': artworks,
    })


def work_detail(request, category, slug):
    """Individual artwork detail page."""
    artwork = get_object_or_404(Artwork, slug=slug)
    
    # Get adjacent works for navigation
    category_works = list(Artwork.objects.filter(medium=category).values_list('slug', flat=True))
    current_index = category_works.index(slug) if slug in category_works else 0
    
    prev_work = None
    next_work = None
    
    if current_index > 0:
        prev_work = Artwork.objects.get(slug=category_works[current_index - 1])
    if current_index < len(category_works) - 1:
        next_work = Artwork.objects.get(slug=category_works[current_index + 1])
    
    return render(request, 'portfolio/work/detail.html', {
        'artwork': artwork,
        'category': category,
        'prev_work': prev_work,
        'next_work': next_work,
    })


def about(request):
    """About page with artist information."""
    # Get the first artist as the main portfolio artist
    artist = Artist.objects.first()
    
    return render(request, 'portfolio/about.html', {
        'artist': artist,
    })


def exhibitions(request):
    """List all exhibitions."""
    current_exhibitions = Exhibition.objects.filter(is_current=True)
    upcoming_exhibitions = Exhibition.objects.filter(is_upcoming=True)
    past_exhibitions = Exhibition.objects.filter(is_current=False, is_upcoming=False)
    
    return render(request, 'portfolio/exhibitions.html', {
        'current_exhibitions': current_exhibitions,
        'upcoming_exhibitions': upcoming_exhibitions,
        'past_exhibitions': past_exhibitions,
    })


def contact(request):
    """Contact page."""
    artist = Artist.objects.first()
    
    return render(request, 'portfolio/contact.html', {
        'artist': artist,
    })
