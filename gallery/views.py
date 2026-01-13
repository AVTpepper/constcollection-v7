from django.shortcuts import render, get_object_or_404
from .models import Artwork, Artist


def artwork_list(request):
    """Gallery page with filter and sort functionality."""
    artworks = Artwork.objects.filter(is_available=True).select_related('artist')
    
    # Filter by medium
    medium = request.GET.get('medium')
    if medium:
        artworks = artworks.filter(medium=medium)
    
    # Sort options
    sort = request.GET.get('sort', 'featured')
    if sort == 'newest':
        artworks = artworks.order_by('-year', '-created_at')
    elif sort == 'price-low':
        artworks = artworks.order_by('price')
    elif sort == 'price-high':
        artworks = artworks.order_by('-price')
    elif sort == 'artist':
        artworks = artworks.order_by('artist__name', 'title')
    else:  # featured (default)
        artworks = artworks.order_by('-is_featured', '-is_new', '-created_at')
    
    # Get unique mediums for filter dropdown
    medium_choices = Artwork.MEDIUM_CHOICES
    
    context = {
        'artworks': artworks,
        'medium_choices': medium_choices,
        'current_medium': medium,
        'current_sort': sort,
    }
    return render(request, 'gallery/artwork_list.html', context)


def artwork_detail(request, slug):
    """Artwork detail page with image gallery."""
    artwork = get_object_or_404(
        Artwork.objects.select_related('artist'),
        slug=slug,
        is_available=True
    )
    
    # Get related artworks (same artist or medium)
    related_artworks = Artwork.objects.filter(
        is_available=True
    ).exclude(id=artwork.id).select_related('artist')[:4]
    
    # Build image list for gallery
    images = [artwork.image]
    if artwork.image_detail_1:
        images.append(artwork.image_detail_1)
    if artwork.image_detail_2:
        images.append(artwork.image_detail_2)
    if artwork.image_detail_3:
        images.append(artwork.image_detail_3)
    
    context = {
        'artwork': artwork,
        'related_artworks': related_artworks,
        'images': images,
    }
    return render(request, 'gallery/artwork_detail.html', context)
