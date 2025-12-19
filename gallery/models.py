from django.db import models
from django.urls import reverse


class Artist(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    bio = models.TextField(blank=True)
    photo = models.CharField(max_length=500, blank=True, help_text="Path to artist photo in media folder")
    website = models.URLField(blank=True)
    instagram = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('artist_detail', kwargs={'slug': self.slug})


class Artwork(models.Model):
    MEDIUM_CHOICES = [
        ('oil', 'Oil on Canvas'),
        ('acrylic', 'Acrylic on Canvas'),
        ('watercolor', 'Watercolor'),
        ('mixed', 'Mixed Media'),
        ('digital', 'Digital Print'),
        ('photography', 'Photography'),
        ('sculpture', 'Sculpture'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='artworks')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=500, help_text="Path to main image in media folder")
    image_detail_1 = models.CharField(max_length=500, blank=True, help_text="Path to detail image 1")
    image_detail_2 = models.CharField(max_length=500, blank=True, help_text="Path to detail image 2")
    medium = models.CharField(max_length=20, choices=MEDIUM_CHOICES)
    dimensions = models.CharField(max_length=100, help_text="e.g., 36 x 48 inches")
    year = models.PositiveIntegerField()
    description = models.TextField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} by {self.artist.name}"

    def get_absolute_url(self):
        return reverse('artwork_detail', kwargs={'slug': self.slug})

    def get_medium_display_full(self):
        return dict(self.MEDIUM_CHOICES).get(self.medium, self.medium)
